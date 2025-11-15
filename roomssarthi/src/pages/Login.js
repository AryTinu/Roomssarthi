import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ✅ for navigation
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Real backend authentication handler
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://roomssarthi.onrender.com/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      if (data.user.isAdmin) {
        navigate("/admin"); // ✅ redirect admin
      } else {
        navigate("/"); // ✅ redirect regular user
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};


  return (
    <Container
      fluid
      className="login-container d-flex align-items-center justify-content-center min-vh-100"
    >
      <Row
        className="shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ maxWidth: '950px' }}
      >
        {/* Left Panel */}
        <Col
          md={6}
          className="left-panel text-white p-5 d-flex flex-column justify-content-center"
        >
          <h1 className="fw-bold mb-3">Find Your Perfect Flatmate</h1>
          <p className="mb-4">
            Connect with compatible roommates and discover shared apartments that feel like home.
          </p>
          <ul className="list-unstyled">
            <li>✓ Browse verified listings</li>
            <li>✓ Connect with potential flatmates</li>
            <li>✓ Secure and easy booking</li>
            <li>✓ 24/7 customer support</li>
          </ul>
        </Col>

        {/* Right Panel */}
        <Col md={6} className="p-5">
          <div className="mb-3 fs-4 fw-bold brand-text">
            🏠 <span className="brand-room">Room</span>
            <span className="brand-saarthi">Saarthi</span>
          </div>

          <h2 className="fw-semibold mb-1">Welcome Back</h2>
          <p className="text-muted mb-4">
            Enter your credentials to access your account
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

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="text-end mb-3">
              <a href="#!" className="text-primary text-decoration-none small">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-100 btn-login"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>

          <div className="text-center text-muted my-3">or</div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              className="flex-fill"
              onClick={() => alert('Google login coming soon!')}
            >
              Google
            </Button>
            <Button
              variant="outline-secondary"
              className="flex-fill"
              onClick={() => alert('Facebook login coming soon!')}
            >
              Facebook
            </Button>
          </div>

          <p className="text-center text-muted mt-4">
            Don’t have an account?{' '}
            <a
              href="#!"
              className="text-primary fw-semibold text-decoration-none"
              onClick={() => navigate('/register')}
            >
              Sign up
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
