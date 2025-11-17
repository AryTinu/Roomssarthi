import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://roomssarthi.onrender.com/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <Container
      fluid
      className="login-container d-flex align-items-center justify-content-center min-vh-100"
    >
      <Row
        className="shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ maxWidth: "650px" }}
      >
        <Col md={12} className="p-5">
          <h2 className="fw-semibold mb-3">Forgot Password?</h2>
          <p className="text-muted mb-4">
            Enter your email and we’ll send you a password reset link.
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-login">
              Send Reset Link
            </Button>
          </Form>

          {msg && (
            <div className="alert alert-info mt-3 text-center">{msg}</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
