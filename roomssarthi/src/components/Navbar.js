import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // ✅ Check login status on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name);
      } catch {
        console.error("Invalid user data in localStorage");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // ✅ Login navigation
  const handleLoginClick = () => {
    navigate("/login");
  };

  // ✅ Register navigation
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar py-3">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center brand-name fw-bold fs-4">
          <span className="room-black">Room</span>
          <span className="saarthi-green">Saarthi</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#features" className="nav-link-custom">
              Features
            </Nav.Link>
            <Nav.Link href="#cities" className="nav-link-custom">
              Areas
            </Nav.Link>
            <Nav.Link href="#services" className="nav-link-custom">
              Services
            </Nav.Link>
            <Nav.Link href="#app-download" className="nav-link-custom">
              Download App
            </Nav.Link>

            {/* ✅ Conditional Rendering */}
            {!isLoggedIn ? (
              <>
                <Button className="btn-gradient ms-3" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button
                  variant="outline-success"
                  className="ms-2"
                  onClick={handleRegisterClick}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <span className="ms-3 fw-semibold text-success">
                  Hi, {userName.split(" ")[0]} 👋
                </span>
                <Button
                  variant="outline-danger"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
