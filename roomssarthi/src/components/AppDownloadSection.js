import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

const AppDownloadSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="app-download-section text-center py-5"
      id="app-download"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glowing background blob effect */}
      <div className="glow-circle glow1"></div>
      <div className="glow-circle glow2"></div>

      <Container data-aos="fade-up">
        <h2 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
          Download Our Android App
        </h2>
        <p className="mb-4 lead">
          Experience smart room searching and instant flatmate matching — right
          from your phone.
        </p>

        {/* Google Play Button */}
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="google-play-btn"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="play-badge"
          />
        </a>

        {/* Floating phone illustration */}
        <div className="phone-mockup mt-5" data-aos="zoom-in">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920324.png"
            alt="Phone app preview"
            className="img-fluid"
            style={{
              maxWidth: "200px",
              opacity: 0.9,
              filter: "drop-shadow(0 0 30px rgba(255,255,255,0.3))",
            }}
          />
        </div>
      </Container>
    </section>
  );
};

export default AppDownloadSection;
