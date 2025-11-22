import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import listingsRouter from "./routes/listings.js";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/emailRoutes.js";
import nodemailer from "nodemailer";   // ✅ Added

const app = express();

/* ============================================
   ⭐ FIXED CORS (Correct Order for Render + Vercel)
=============================================== */
app.use(
  cors({
    origin: [
      "https://roomssarthi.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ============================================
   📦 Body Parser
=============================================== */
app.use(express.json());

/* ============================================
   🟢 Render Keep Alive Route
=============================================== */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* ============================================
   📧 BREVO SMTP SETUP (NEW)
=============================================== */
const brevoTransporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,  // smtp-relay.brevo.com
  port: process.env.BREVO_PORT,  // 587
  secure: false,
  auth: {
    user: process.env.BREVO_USER, // your Brevo email
    pass: process.env.BREVO_PASS, // SMTP Key from Brevo
  },
});

/* ============================================
   🚀 BREVO SMTP TEST ROUTE (NEW)
=============================================== */
app.get("/test-email", async (req, res) => {
  try {
    await brevoTransporter.sendMail({
      from: `"RoomSaarthi Test" <${process.env.BREVO_USER}>`,
      to: process.env.BREVO_USER,  // will send to yourself
      subject: "RoomSaarthi SMTP Test",
      text: "Brevo SMTP is working 🎉",
    });

    console.log("📧 Test email sent successfully");
    res.send("SMTP test email sent!");
  } catch (error) {
    console.error("❌ SMTP Test Error:", error);
    res.status(500).json({ error });
  }
});

/* ============================================
   🚀 API Routes
=============================================== */
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRouter);

/* ============================================
   🍃 MongoDB connection
=============================================== */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ============================================
   ☁ Cloudinary env check
=============================================== */
console.log("\n--- Environment Check ---");
console.log(
  "CLOUDINARY_CLOUD_NAME:",
  process.env.CLOUDINARY_CLOUD_NAME || "❌ MISSING"
);
console.log(
  "CLOUDINARY_API_KEY:",
  process.env.CLOUDINARY_API_KEY ? "✅ FOUND" : "❌ MISSING"
);
console.log(
  "CLOUDINARY_API_SECRET:",
  process.env.CLOUDINARY_API_SECRET ? "✅ FOUND" : "❌ MISSING"
);
console.log("--------------------------\n");

/* ============================================
   🟢 Start Server
=============================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
