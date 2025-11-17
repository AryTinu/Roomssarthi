import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const router = express.Router();

/* ============================================
   📧 NODEMAILER SETUP
=============================================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test email connection once
transporter.verify((err, success) => {
  if (err) console.log("❌ Email service error:", err);
  else console.log("✅ Email service is ready!");
});

/* ============================================
   📝 SEND WELCOME EMAIL (Reusable Function)
=============================================== */
const sendWelcomeEmail = async (name, email) => {
  const html = `
    <div style="font-family: Poppins, sans-serif; color: #333;">
      <h2 style="color: #08A045;">Welcome to RoomSaarthi, ${name}! 🎉</h2>
      <p>We’re thrilled to have you here.</p>

      <p>You can now:</p>
      <ul>
        <li>🔎 Browse rooms, PGs & flats</li>
        <li>🤝 Find trusted roommates</li>
        <li>💬 Connect safely with owners</li>
      </ul>

      <a href="http://localhost:3000/login"
        style="background-color:#08A045;color:white;padding:12px 18px;
        border-radius:8px;text-decoration:none;font-weight:bold;">
        Login to Your Account
      </a>

      <br/><br/>
      <p style="color: #777;">— Team <strong>RoomSaarthi</strong> 🏡</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"RoomSaarthi 🏠" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to RoomSaarthi, ${name}! 🎉`,
      html,
    });

    console.log("📩 Welcome email sent:", email);
  } catch (err) {
    console.error("❌ Error sending welcome email:", err);
  }
};

/* ============================================
   📝 REGISTER USER + SEND GREETING EMAIL
=============================================== */
router.post("/Register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    await newUser.save();

    // Send welcome email (async)
    sendWelcomeEmail(name, email);

    return res.status(201).json({
      message: "Registration successful! A welcome email has been sent.",
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================================
   🔐 LOGIN USER
=============================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
