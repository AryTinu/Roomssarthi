import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"RoomSaarthi 🏠" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📩 Email sent:", subject);
    return true;   // ✅ SUCCESS RETURN

  } catch (err) {
    console.error("❌ Email error:", err);
    return false;  // ❌ FAILURE RETURN
  }
};

export default sendEmail;
