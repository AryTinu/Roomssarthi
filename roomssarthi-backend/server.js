import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import listingsRouter from "./routes/listings.js";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/emailRoutes.js";
import SibApiV3Sdk from "sib-api-v3-sdk";   // ✅ Brevo API SDK

const app = express();

/* ============================================
   ⭐ FIXED CORS
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
   📧 BREVO API SETUP (MUST MATCH auth.js)
=============================================== */
const brevoClient = SibApiV3Sdk.ApiClient.instance;
brevoClient.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

const brevoEmail = new SibApiV3Sdk.TransactionalEmailsApi();

/* ============================================
   🚀 BREVO TEST EMAIL (WORKING)
=============================================== */
app.get("/test-email", async (req, res) => {
  try {
    const result = await brevoEmail.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER,
        name: "RoomSaarthi Test",
      },
      to: [{ email: process.env.ADMIN_EMAIL }],
      subject: "RoomSaarthi Test Email ✔",
      htmlContent: "<h2>Brevo API is working 🎉</h2>",
    });

    console.log("📧 Test Email Sent:", result);
    res.send("Test email sent successfully!");

  } catch (error) {
    console.error("❌ Brevo Test Error:", error);
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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

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
