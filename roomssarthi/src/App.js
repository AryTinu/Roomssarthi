import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Landing page components
import NavigationBar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CitiesSection from "./components/CitiesSection";
import ServicesSection from "./components/ServicesSection";
import AppDownloadSection from "./components/AppDownloadSection";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import FlatMateFinderPage from "./pages/FlatMateFinderPage";

// Forgot / Reset Password Pages
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Landing Page */}
        <Route
          path="/"
          element={
            <>
              <NavigationBar />
              <HeroSection />
              <div id="features">
                <FeaturesSection />
              </div>
              <div id="Areas">
                <CitiesSection />
              </div>
              <div id="services">
                <ServicesSection />
              </div>
              <AppDownloadSection />
              <Footer />
            </>
          }
        />

        {/* ✅ Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔑 Forgot / Reset Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 🔐 Protected: Flatmate Finder Pages */}
        <Route
          path="/flatmatefinder"
          element={
            <ProtectedRoute>
              <FlatMateFinderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/flatmatefinder/:cityName"
          element={
            <ProtectedRoute>
              <FlatMateFinderPage />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Protected: Admin Panel (Admin Only) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
