import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import crypto from "crypto";
import { Resend } from "resend";

dotenv.config();
const router = express.Router();

/* ============================================
   📧 RESEND SETUP (NO SMTP REQUIRED)
=============================================== */
const resend = new Resend(process.env.RESEND_API_KEY);

/* ============================================
   📨 SEND WELCOME EMAIL
=============================================== */
const sendWelcomeEmail = async (name, email) => {
  try {
    const result = await resend.emails.send({
      from: process.env.SENDER_EMAIL,  // MUST MATCH RESEND VERIFIED DOMAIN!
      to: email,
      subject: `Welcome to RoomSaarthi, ${name}! 🎉`,
      html: `
        <div style="font-family: Poppins, sans-serif; color: #333;">
          <h2 style="color: #08A045;">Welcome to RoomSaarthi, ${name}! 🎉</h2>
          <p>We’re excited to have you on board!</p>
          <a href="https://roomssarthi.vercel.app/login"
             style="background-color:#08A045;color:white;padding:12px 18px;
             border-radius:8px;text-decoration:none;font-weight:bold;">
             Login to Your Account
          </a>
        </div>
      `,
    });

    console.log("📧 Welcome Email Sent:", result);

  } catch (err) {
    console.error("❌ Error sending welcome email:", err);
  }
};

/* ============================================
   📝 REGISTER USER
=============================================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    await newUser.save();

    // send async (non blocking)
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

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

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

/* ============================================
   🔐 FORGOT PASSWORD - SEND RESET LINK
=============================================== */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `https://roomssarthi.vercel.app/reset-password/${resetToken}`;

    const result = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset your RoomSaarthi password",
      html: `
        <h3>Hello ${user.name},</h3>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}"
           style="background:#08A045;padding:10px 18px;color:white;
           border-radius:8px;text-decoration:none;">
           Reset Password
        </a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    console.log("📧 Reset Email Sent:", result);

    res.json({ message: "Reset link sent to your email" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================================
   🔐 RESET PASSWORD
=============================================== */
router.post("/reset-password/:token", async (req, res) => {
  try {
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful!" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
