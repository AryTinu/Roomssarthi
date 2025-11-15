import express from "express";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { email, name, message, listing } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // ⭐ Professional HTML Template
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 15px;">
      <h2 style="color: #08A045;">📬 New Message Received</h2>

      <p>You got a new message from <strong>${name}</strong>.</p>

      <p><strong>Message:</strong></p>
      <p style="background:#f4f4f4;padding:10px;border-radius:5px;">
        ${message}
      </p>

      <hr style="margin: 20px 0;">

      <p><strong>Regarding Listing:</strong> ${listing || "N/A"}</p>

      <br>
      <p style="color:#555;font-size: 14px;">
        — <strong>RoomSaarthi Notification System</strong>
      </p>
    </div>
  `;

  const success = await sendEmail({
    to: "roomsaarthi@gmail.com", // must be REAL gmail
    subject: `📩 New Message from ${name}`,
    html,
  });

  if (!success) {
    return res.status(500).json({ message: "Email failed to send" });
  }

  res.status(200).json({ message: "Email sent successfully!" });
});

export default router;
