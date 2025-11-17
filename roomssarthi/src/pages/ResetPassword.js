import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `https://roomssarthi.onrender.com/api/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();
    setMsg(data.message);

    if (res.ok) {
      setTimeout(() => navigate("/login"), 2000);
    }
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
          <h2 className="fw-semibold mb-3">Reset Password</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-login">
              Reset Password
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

export default ResetPassword;
