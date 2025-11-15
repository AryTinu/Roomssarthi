import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    // ⭐ SET admin user so listing route can read it
    req.adminUser = user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid token" });
  }
};
