import express from "express";
import Listing from "../models/Listing.js";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { verifyAdmin } from "../middleware/adminAuth.js";

dotenv.config();
const router = express.Router();

router.use(cors());

// ------------------------
// Configure Cloudinary
// ------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "roomssarthi",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const parser = multer({ storage });

// ------------------------
// Configure Nodemailer
// ------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ------------------------
// MongoDB Connection Check
// ------------------------
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn("⚠️ MongoDB not connected");
    return res.status(503).json({ error: "Database not connected" });
  }
  next();
});

// ------------------------
// CREATE Listing (Admin Only)
// ------------------------
router.post("/", verifyAdmin, parser.array("images"), async (req, res) => {
  try {
    console.log("📥 Incoming POST /api/listings");
    console.log("📝 Request body:", req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const images = req.files.map((file) => file.path);

    // Handle amenities input
    let amenitiesArray = [];
    if (req.body.amenities) {
      if (Array.isArray(req.body.amenities)) {
        amenitiesArray = req.body.amenities.map((item) => item.trim());
      } else {
        amenitiesArray = req.body.amenities.split(",").map((item) => item.trim());
      }
    }

    const { title, price, description, location, city, type, gender } = req.body;

    if (!title || !price || !description || !location) {
      return res.status(400).json({
        error: "Missing required fields: title, price, description, or location",
      });
    }

    // ⭐ NEW: Read Admin from verifyAdmin middleware
    const admin = req.adminUser;

    const listingData = {
      title,
      price: Number(price),
      description,
      location,
      images,
      amenities: amenitiesArray,
      type: type ? type.toLowerCase() : "rooms",
      gender: gender ? gender.toLowerCase() : "any",

      // ⭐ SAVE OWNER DETAILS
      ownerName: admin?.name || "Admin",
      ownerEmail: admin?.email || process.env.ADMIN_EMAIL,
    };

    if (city && city.trim() !== "") listingData.city = city.trim();

    const listing = new Listing(listingData);
    await listing.save();

    console.log("✅ Listing saved successfully:", listing._id);

    // -----------------------------
    // SEND ADMIN EMAIL NOTIFICATION
    // -----------------------------
    const mailOptions = {
      from: `"RoomSaarthi Admin 🏠" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🆕 New Listing Added: ${title}`,
      html: `
        <div style="font-family: Poppins, sans-serif; line-height:1.6; color:#333;">
          <h2>📌 New Listing Added</h2>

          <p><strong>Owner:</strong> ${listingData.ownerName} (${listingData.ownerEmail})</p>

          <p><strong>Title:</strong> ${title}</p>
          <p><strong>City:</strong> ${city || "N/A"}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Price:</strong> ₹${price}</p>
          <p><strong>Type:</strong> ${type}, Gender: ${gender}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Amenities:</strong> ${amenitiesArray.join(", ")}</p>
          <p>📸 ${images.length} image(s) uploaded.</p>

          <hr>
          <p style="font-size:0.9rem; color:#666;">— RoomSaarthi Admin Notification System</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("❌ Email send error:", err);
      else console.log("✅ Admin email sent:", info.response);
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error("❌ Error creating listing:", err);
    res.status(500).json({
      error: "Failed to create listing",
      details: err.message || "Unknown error",
    });
  }
});

// ------------------------
// GET All Listings (Public)
// ------------------------
router.get("/", async (req, res) => {
  try {
    const { type, gender, location, title, minPrice, maxPrice } = req.query;

    let filter = {};

    if (type && type !== "all") filter.type = type;
    if (gender && gender !== "any") filter.gender = gender;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (title) filter.title = { $regex: title, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const listings = await Listing.find(filter);
    res.json(listings);
  } catch (err) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).json({ error: "Failed to fetch listings", details: err.message });
  }
});

// ------------------------
// DELETE Listing (Admin Only)
// ------------------------
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Failed to delete listing", details: err.message });
  }
});

export default router;
