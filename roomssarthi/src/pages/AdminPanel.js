import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card, Image } from "react-bootstrap";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("rooms");
  const [gender, setGender] = useState("any");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchListings();
  }, []);

  // ✅ Fetch all listings (public route)
  const fetchListings = async () => {
    try {
      const res = await axios.get("https://roomssarthi.onrender.com/api/listings");
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  // ✅ Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // ✅ Add a new listing (Admin only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !location || !price || images.length === 0) {
      alert("Please fill all required fields (title, location, price) and select at least one image.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (city.trim() !== "") formData.append("city", city);
      formData.append("location", location);
      formData.append("type", type);
      formData.append("gender", gender);
      formData.append("price", price);
      formData.append("description", description);

      amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((a) => formData.append("amenities", a));

      images.forEach((img) => formData.append("images", img));

      // ✅ Include JWT token in header
      await axios.post("https://roomssarthi.onrender.com/api/listings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Listing added successfully!");
      resetForm();
      fetchListings();
    } catch (err) {
      console.error("❌ Error adding listing:", err);
      if (err.response?.status === 401) {
        alert("Unauthorized! Please log in as an admin.");
      } else {
        alert("Failed to add listing. Check console for details.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Reset form fields
  const resetForm = () => {
    setTitle("");
    setCity("");
    setLocation("");
    setType("rooms");
    setGender("any");
    setPrice("");
    setDescription("");
    setAmenities("");
    setImages([]);
    setImagePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // ✅ Delete listing (Admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`https://roomssarthi.onrender.com/api/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
      });

      alert("🗑️ Listing deleted!");
      fetchListings();
    } catch (err) {
      console.error("Error deleting listing:", err);
      if (err.response?.status === 401) {
        alert("Unauthorized! Only admins can delete listings.");
      } else {
        alert("Failed to delete listing. Check console for details.");
      }
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-success fw-bold">Admin Panel 🛠️</h2>

      {/* ✅ Listing Form */}
      <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
        <Row className="g-3">
          <Col md={6}>
            <Form.Control
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="City (optional)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="rooms">Rooms</option>
              <option value="roommates">Roommates</option>
              <option value="pg">PG</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Control
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Amenities (comma separated)"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              required
            />
          </Col>
        </Row>

        {imagePreviews.length > 0 && (
          <Row className="mt-3">
            {imagePreviews.map((src, idx) => (
              <Col key={idx} xs={4} md={2}>
                <Image src={src} thumbnail />
              </Col>
            ))}
          </Row>
        )}

        <Button
          type="submit"
          className="mt-3 w-100"
          disabled={isLoading}
          variant="success"
        >
          {isLoading ? "Adding..." : "Add Listing"}
        </Button>
      </Form>

      <hr />

      {/* ✅ All Listings */}
      <Row className="mt-4">
        {listings.map((listing) => (
          <Col md={4} key={listing._id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={listing.images[0]}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{listing.title}</Card.Title>
                <Card.Text>
                  {listing.city && `${listing.city}, `}
                  {listing.location} - ₹{listing.price} <br />
                  Type: {listing.type}, Gender: {listing.gender} <br />
                  Amenities: {listing.amenities.join(", ")}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(listing._id)}
                  className="w-100"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminPanel;
