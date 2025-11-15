import { useState } from "react";
import axios from "axios";

export default function AddListingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    city: "",
    location: "",
    type: "rooms", // default
    gender: "any",
    price: "",
    description: "",
    amenities: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert amenities and images from comma-separated to arrays
    const dataToSend = {
      ...formData,
      amenities: formData.amenities.split(",").map((a) => a.trim()),
      images: formData.images.split(",").map((i) => i.trim()),
    };

    try {
      await axios.post("http://localhost:5000/api/listings", dataToSend);
      alert("Listing submitted successfully! We'll contact you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        title: "",
        city: "",
        location: "",
        type: "rooms",
        gender: "any",
        price: "",
        description: "",
        amenities: "",
        images: "",
      });
    } catch (err) {
      console.error("Error submitting listing:", err);
      alert("Failed to submit listing.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-3"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add New Listing
      </h2>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Listing Info */}
      <input
        type="text"
        name="title"
        placeholder="Property Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location / Area"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="rooms">Rooms</option>
          <option value="roommates">Roommates</option>
          <option value="pg">PG</option>
        </select>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <textarea
        name="description"
        placeholder="Property Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
      />

      <input
        type="text"
        name="amenities"
        placeholder="Amenities (comma separated)"
        value={formData.amenities}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="images"
        placeholder="Image URLs (comma separated)"
        value={formData.images}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Submit Listing
      </button>
    </form>
  );
}
