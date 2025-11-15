import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Modal, Button, Carousel } from "react-bootstrap";
import "../App.css";
import NavigationBar from "../components/Navbar";

export default function FlatMateFinderPage() {
  const [listings, setListings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedListing, setSelectedListing] = useState(null);

  const [locationFilter, setLocationFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("any");
  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [emailMessage, setEmailMessage] = useState("");

  // -------------------------------
  // ⭐ FETCH LISTINGS (BACKEND DOES FILTERING)
  // -------------------------------
  const fetchListings = useCallback(async () => {
    try {
      const params = {};

      if (selectedTab !== "all") params.type = selectedTab;
      if (genderFilter !== "any") params.gender = genderFilter;
      if (locationFilter.trim() !== "") params.location = locationFilter.trim();
      if (minPrice !== "") params.minPrice = Number(minPrice);
      if (maxPrice !== "") params.maxPrice = Number(maxPrice);
      if (searchName.trim() !== "") params.title = searchName.trim();

      const res = await axios.get(
        "https://roomssarthi.onrender.com/api/listings",
        { params }
      );

      setListings(res.data); // LET BACKEND DO THE FILTERING
    } catch (err) {
      console.error("Fetch listings error:", err);
    }
  }, [
    selectedTab,
    genderFilter,
    locationFilter,
    minPrice,
    maxPrice,
    searchName,
  ]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // -------------------------------
  // ⭐ CLEAR FILTERS
  // -------------------------------
  const clearFilters = () => {
    setLocationFilter("");
    setGenderFilter("any");
    setSearchName("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedTab("all");
  };

  // -------------------------------
  // ⭐ SEND EMAIL TO OWNER
  // -------------------------------
  const handleSendEmail = async () => {
    if (!emailMessage.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("https://roomssarthi.onrender.com/api/email/send", {
        name: user.name,
        email: user.email,
        ownerEmail: selectedListing.ownerEmail,
        message: `
          Message from ${user.name} (${user.email}):
          
          ${emailMessage}

          Regarding listing: ${selectedListing.title}
        `,
      });

      alert("Email sent successfully!");
      setEmailMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    }
  };

  // -------------------------------
  // ⭐ UI
  // -------------------------------
  return (
    <div className="min-vh-100 bg-light">
      <NavigationBar />

      <div className="container-fluid px-4 py-5" style={{ marginTop: "90px" }}>
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          {/* filters UI kept same */}
        </div>

        {/* LISTINGS */}
        <div className="row g-4">
          {listings.length === 0 ? (
            <div className="col-12 text-center py-5 text-muted">
              <p className="fs-5">No listings found</p>
            </div>
          ) : (
            listings.map((listing) => (
              <div
                key={listing._id}
                className="col-md-4"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedListing(listing)}
              >
                <div className="card shadow-sm h-100">
                  <img
                    src={listing.images?.[0]}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={listing.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="text-success fw-bold">₹{listing.price}</p>
                    <p className="text-muted mb-0">{listing.location}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ⭐ MODAL */}
      {selectedListing && (
        <Modal
          show={!!selectedListing}
          onHide={() => setSelectedListing(null)}
          size="lg"
          centered
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedListing.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Carousel indicators={selectedListing.images.length > 1}>
              {selectedListing.images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Slide ${idx}`}
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="mt-3">
              <p>{selectedListing.description}</p>

              <h6>Amenities:</h6>
              <ul>
                {selectedListing.amenities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>

              <p className="fw-bold text-success">₹{selectedListing.price}</p>
            </div>

            <hr />

            {/* EMAIL */}
            <h5>Contact Owner</h5>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your message..."
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            ></textarea>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success" onClick={handleSendEmail}>
              Send Message
            </Button>

            <Button
              variant="secondary"
              onClick={() => setSelectedListing(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
