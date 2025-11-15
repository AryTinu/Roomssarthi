import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CitiesSection = () => {
  const navigate = useNavigate();

  const cities = [
    { name: "KarveNagar", img: "https://collection.cloudinary.com/dh2qbxefv/89b46d1a3d7bb158837abdc0850bbc7c" },
    { name: "HingeWadi", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { name: "Warje", img: "https://images.unsplash.com/photo-1562003382-9f7ef3e0b5b6" },
  ];

  return (
    <Container className="my-5" id="cities">
      <h2 className="section-title mb-4 text-center">Popular Cities</h2>
      <p className="text-center mb-5 text-muted">
        Explore rooms and flatmates in these top locations.
      </p>

      <Row className="g-4">
        {cities.map((city, idx) => (
          <Col xs={12} sm={6} md={4} key={idx}>
            <Card
              className="text-center shadow-sm city-card"
              onClick={() => navigate(`/flatmatefinder/${city.name}`)}
            >
              <Card.Img
                variant="top"
                src={city.img}
                className="city-img"
              />
              <Card.Body className="bg-light p-3">
                <Card.Title className="fw-bold fs-5">{city.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CitiesSection;
