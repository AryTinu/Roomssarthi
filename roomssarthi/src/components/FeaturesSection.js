import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaHandshake, FaUsers, FaCheckCircle, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";
import "../App.css";

const features = [
  {
    icon: <FaHandshake size={45} color="#4caf50" />,
    title: "Brokerage-Free Listings",
    desc: "All listings are completely free from brokerage fees, ensuring direct connections between owners and tenants.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    animation: { y: [50, 0], opacity: [0, 1], transition: { duration: 0.6, ease: "easeOut" } },
  },
  {
    icon: <FaUsers size={45} color="#4caf50" />,
    title: "Team Creation",
    desc: "Form or join teams easily to find shared accommodation with like-minded people.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    animation: { x: [-50, 0], opacity: [0, 1], transition: { duration: 0.6, ease: "easeOut" } },
  },
  {
    icon: <FaCheckCircle size={45} color="#4caf50" />,
    title: "Match Compatibility",
    desc: "Get personalized roommate or flatmate matches based on lifestyle and preferences.",
    img: "https://images.unsplash.com/photo-1581093588401-22b5e3a9e4b8?auto=format&fit=crop&w=900&q=80",
    animation: { scale: [0.9, 1], opacity: [0, 1], transition: { duration: 0.6, ease: "easeOut" } },
  },
  {
    icon: <FaComments size={45} color="#4caf50" />,
    title: "Secure Chat",
    desc: "Chat safely without revealing personal information until you're comfortable.",
    img: "https://images.unsplash.com/photo-1590608897129-79da98d15986?auto=format&fit=crop&w=900&q=80",
    animation: { rotate: [-3, 0], opacity: [0, 1], transition: { duration: 0.6, ease: "easeOut" } },
  },
];

const FeaturesSection = () => {
  return (
    <section style={{ backgroundColor: "#f9f9f9", padding: "80px 0" }} id="features">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Features</h2>

        {features.map((feature, idx) => (
          <Row
            key={idx}
            className="align-items-center mb-5"
            style={{
              flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            {/* Text + Icon */}
            <Col md={6} className="text-center text-md-start">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={feature.animation}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  style={{
                    backgroundColor: "#e8f5e9",
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ color: "#333", fontWeight: "600" }}>{feature.title}</h3>
                <p style={{ color: "#555", marginTop: "10px", fontSize: "1.05rem" }}>
                  {feature.desc}
                </p>
              </motion.div>
            </Col>

            {/* Image */}
            <Col md={6} className="text-center">
              <motion.img
                src={feature.img}
                alt={feature.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                }}
              />
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default FeaturesSection;
