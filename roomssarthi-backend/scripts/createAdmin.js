// scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const existingAdmin = await User.findOne({ email: "admin@roomsaarthi.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    const admin = new User({
      name: "Super Admin",
      email: "admin@roomsaarthi.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("🎉 Admin created successfully!");
    console.log("🧩 Email: admin@roomsaarthi.com");
    console.log("🔑 Password: Admin@123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
