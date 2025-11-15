import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFileContract, FaUserCheck, FaCouch, FaReceipt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

const services = [
  {
    icon: <FaFileContract size={40} color="#0eabff" />,
    title: "Rental Agreement",
    img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437e0?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <FaUserCheck size={40} color="#0eabff" />,
    title: "Tenant Verification",
    img: "https://images.unsplash.com/photo-1604079626375-4c0b8dc4a00c?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <FaCouch size={40} color="#0eabff" />,
    title: "Furniture Rental",
    img: "https://images.unsplash.com/photo-1616627988533-6637b4bb1c44?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <FaReceipt size={40} color="#0eabff" />,
    title: "Rent Receipts",
    img: "https://images.unsplash.com/photo-1581091870622-0efb1f1a41c2?auto=format&fit=crop&w=800&q=80",
  },
];

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }} id="services">
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Our Services
        </h2>

        {services.map((service, idx) => (
          <Row
            key={idx}
            className="align-items-center mb-5"
            style={{
              flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
            }}
            data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <Col md={6} className="text-center text-md-start">
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  margin: "0 auto 20px auto",
                }}
                data-aos="zoom-in"
              >
                {service.icon}
              </div>
              <h3 style={{ fontWeight: "600", color: "#333" }}>{service.title}</h3>
              <p style={{ color: "#555", marginTop: "10px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl vel
                mauris eleifend malesuada.
              </p>
            </Col>

            <Col md={6} className="text-center" data-aos="zoom-in">
              <img
                src={service.img}
                alt={service.title}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              />
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default ServicesSection;
