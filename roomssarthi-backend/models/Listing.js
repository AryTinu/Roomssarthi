import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  city: String,
  images: [String],
  amenities: [String],

  // ⭐ Add these:
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);
