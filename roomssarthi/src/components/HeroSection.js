import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); // <-- initialize navigate

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated glowing circles (background effect) */}
      <div className="hero-bg-circle circle1"></div>
      <div className="hero-bg-circle circle2"></div>

      <div className="container py-5 position-relative">
        <div className="row align-items-center">
          {/* Left content */}
          <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
            <h1 className="display-4 fw-bold mb-4">
              Find Your Perfect Room & Flatmate
            </h1>
            <p className="lead mb-4">
              Discover 1000+ brokerage-free listings. Connect with compatible
              roommates and unlock your ideal living space.
            </p>

            {/* Call-to-action button */}
            <button
              className="btn btn-light btn-lg shadow-sm"
              style={{
                color: "#18392B",
                fontWeight: "600",
                borderRadius: "50px",
                padding: "12px 32px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => navigate("flatmatefinder")} // <-- navigate to FlatMateFinderPage
            >
              Start Exploring →
            </button>
          </div>

          {/* Right visual (floating emoji) */}
          <div className="col-lg-6 text-center" data-aos="zoom-in">
            <div
              className="floating-emoji"
              style={{
                fontSize: "200px",
                opacity: 0.9,
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
              }}
            >
              🏡
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
