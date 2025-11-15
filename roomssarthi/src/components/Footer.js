import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";

const Footer = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #000000, #111111, #1a1a1a)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        padding: "50px 0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container>
        <Row>
          {/* Brand Info */}
          <Col md={6}>
            <h5 style={{ fontWeight: "700", fontSize: "1.8rem", color: "#fff" }}>
              <span className="room-white">Room</span>
              <span className="saarthi-green">Saarthi</span>
            </h5>
            <p style={{ color: "#ccc", marginTop: "15px", lineHeight: "1.6" }}>
              Connecting roommates and rental solutions across India with ease and trust.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h6 style={{ color: "green", fontWeight: "600", marginBottom: "15px" }}>Quick Links</h6>
            <ul className="list-unstyled" style={{ lineHeight: "2" }}>
              <li>
                <a href="#features" style={{ color: "#fff", textDecoration: "none" }}>Features</a>
              </li>
              <li>
                <a href="#cities" style={{ color: "#fff", textDecoration: "none" }}>Cities</a>
              </li>
              <li>
                <a href="#services" style={{ color: "#fff", textDecoration: "none" }}>Services</a>
              </li>
              <li>
                <a href="#app-download" style={{ color: "#fff", textDecoration: "none" }}>Download App</a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <h6 style={{ color: "green", fontWeight: "600", marginBottom: "15px" }}>Contact</h6>
            <p style={{ color: "#ccc", marginBottom: "5px" }}>📧 support@roomsaarthi.in</p>
            <p style={{ color: "#ccc" }}>📞 +91 12345 67890</p>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "30px 0" }} />

        <p className="text-center" style={{ marginBottom: 0, color: "#aaa" }}>
          &copy; {new Date().getFullYear()} RoomSaarthi. All Rights Reserved.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
