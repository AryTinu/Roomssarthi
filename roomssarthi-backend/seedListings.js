import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js"; // Adjust path if needed

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

const seedListings = async () => {
  try {
    // Clear existing listings
    await Listing.deleteMany({});

    const listings = [
      {
        title: "Cozy Room in Warje",
        city: "Pune",
        location: "Warje",
        type: "rooms",
        gender: "any",
        price: 8000,
        description: "A comfortable room with balcony and sunlight.",
        amenities: ["WiFi", "Parking", "Hot Water"],
        images: [
          "https://via.placeholder.com/400x300?text=Room+1",
          "https://via.placeholder.com/400x300?text=Room+1-2"
        ],
      },
      {
        title: "PG for Females near Kothrud",
        city: "Pune",
        location: "Kothrud",
        type: "pg",
        gender: "female",
        price: 12000,
        description: "Fully furnished PG with meals included.",
        amenities: ["Meals", "Laundry", "WiFi"],
        images: [
          "https://via.placeholder.com/400x300?text=PG+1",
        ],
      },
      {
        title: "Roommate Wanted in Aundh",
        city: "Pune",
        location: "Aundh",
        type: "roommates",
        gender: "male",
        price: 7000,
        description: "Looking for a friendly male roommate.",
        amenities: ["WiFi", "AC", "Parking"],
        images: [
          "https://via.placeholder.com/400x300?text=Roommate+1",
        ],
      },
    ];

    await Listing.insertMany(listings);
    console.log("Sample listings inserted!");
    process.exit();
  } catch (err) {
    console.error("Error inserting listings:", err);
    process.exit(1);
  }
};

seedListings();
