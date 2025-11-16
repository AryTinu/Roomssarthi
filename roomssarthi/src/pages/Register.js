import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Password strength meter logic
  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation before request
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!validateEmail(email)) newErrors.email = "Invalid email format.";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("https://roomssarthi.onrender.com/api/auth/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("✅ Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.message || "❌ Registration failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <Container
      fluid
      className="login-container d-flex align-items-center justify-content-center min-vh-100"
    >
      <Row
        className="shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ maxWidth: "950px" }}
      >
        {/* Left Panel */}
        <Col
          md={6}
          className="left-panel text-white p-5 d-flex flex-column justify-content-center"
        >
          <h1 className="fw-bold mb-3">Join the RoomSaarthi Community</h1>
          <p className="mb-4">
            Find roommates who share your lifestyle and make shared living
            enjoyable and affordable.
          </p>
          <ul className="list-unstyled">
            <li>✓ Verified Listings</li>
            <li>✓ Smart Matchmaking</li>
            <li>✓ Secure Chat System</li>
            <li>✓ 24/7 Support</li>
          </ul>
        </Col>

        {/* Right Panel */}
        <Col md={6} className="p-5">
          <div className="mb-3 fs-4 fw-bold brand-text">
            🏠 <span className="brand-room">Room</span>
            <span className="brand-saarthi">Saarthi</span>
          </div>

          <h2 className="fw-semibold mb-1">Create Your Account</h2>
          <p className="text-muted mb-4">
            Enter your details to get started on your flatmate journey
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>

              {/* Password Strength Meter */}
              {password && (
                <div className="mt-2">
                  <ProgressBar
                    now={(passwordStrength / 4) * 100}
                    variant={
                      passwordStrength <= 1
                        ? "danger"
                        : passwordStrength === 2
                        ? "warning"
                        : "success"
                    }
                    label={
                      passwordStrength <= 1
                        ? "Weak"
                        : passwordStrength === 2
                        ? "Medium"
                        : "Strong"
                    }
                  />
                </div>
              )}
            </Form.Group>

            <Button
              type="submit"
              className="w-100 btn-login"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </Form>

          <div className="text-center text-muted my-3">or</div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              className="flex-fill"
              onClick={() => alert("Google signup coming soon!")}
            >
              Google
            </Button>
            <Button
              variant="outline-secondary"
              className="flex-fill"
              onClick={() => alert("Facebook signup coming soon!")}
            >
              Facebook
            </Button>
          </div>

          <p className="text-center text-muted mt-4">
            Already have an account?{" "}
            <a
              href="#!"
              className="text-primary fw-semibold text-decoration-none"
              onClick={() => navigate("/login")}
            >
              Sign in
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
