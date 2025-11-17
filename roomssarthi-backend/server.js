import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import listingsRouter from "./routes/listings.js";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();

/* ============================================
   ⭐ FIXED CORS (Correct Order for Render + Vercel)
=============================================== */

// 1️⃣ Main CORS middleware FIRST
app.use(
  cors({
    origin: [
      "https://roomssarthi.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 2️⃣ Must allow preflight OPTIONS requests AFTER CORS setup
// app.options("*", cors());

/* ============================================
   📦 Body Parser
=============================================== */
app.use(express.json());

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
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME || "❌ MISSING");
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "✅ FOUND" : "❌ MISSING");
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅ FOUND" : "❌ MISSING");
console.log("--------------------------\n");

/* ============================================
   🟢 Start Server
=============================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
