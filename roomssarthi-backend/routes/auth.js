import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import crypto from "crypto";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();
const router = express.Router();

/* ============================================
   📧 BREVO API SETUP (NOT SMTP)
=============================================== */
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const brevoEmail = new SibApiV3Sdk.TransactionalEmailsApi();

/* ============================================
   📨 SEND WELCOME EMAIL
=============================================== */
const sendWelcomeEmail = async (name, email) => {
  try {
    await brevoEmail.sendTransacEmail({
      sender: { email: process.env.BREVO_SENDER, name: "RoomSaarthi 🏡" },
      to: [{ email }],
      subject: `Welcome to RoomSaarthi, ${name}! 🎉`,
      htmlContent: `
        <div style="font-family: Poppins, sans-serif; color: #333;">
          <h2 style="color: #08A045;">Welcome to RoomSaarthi, ${name}! 🎉</h2>
          <p>We’re thrilled to have you join us.</p>

          <a href="https://roomssarthi.vercel.app/login"
             style="background:#08A045;color:white;padding:12px 18px;
             border-radius:8px;text-decoration:none;font-weight:bold;">
             Login to Your Account
          </a>

          <p style="margin-top:15px">— Team RoomSaarthi</p>
        </div>
      `,
    });

    console.log("📧 Welcome Email Sent!");
  } catch (err) {
    console.log("❌ Welcome Email Error:", err);
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

    // send async
    sendWelcomeEmail(name, email);

    return res
      .status(201)
      .json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================================
   🔐 LOGIN
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
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================================
   🔐 FORGOT PASSWORD
=============================================== */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = resetHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetLink = `https://roomssarthi.vercel.app/reset-password/${resetToken}`;

    // Send email via Brevo API
    await brevoEmail.sendTransacEmail({
      sender: { email: process.env.BREVO_SENDER, name: "RoomSaarthi 🏡" },
      to: [{ email }],
      subject: "Reset Your RoomSaarthi Password",
      htmlContent: `
        <h3>Hello ${user.name},</h3>
        <p>Click the button below to reset your password:</p>

        <a href="${resetLink}"
           style="background:#08A045;color:#fff;padding:10px 18px;
           border-radius:8px;text-decoration:none;">
           Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>
      `,
    });

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
    const resetHash = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetHash,
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
