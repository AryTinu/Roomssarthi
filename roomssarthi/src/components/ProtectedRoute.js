import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");

  // Safely parse user data
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
  } catch {
    console.error("Invalid user data in localStorage");
    localStorage.removeItem("user");
  }

  // 🚫 User not logged in → Send to Login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If this is admin route but user is not admin → redirect home
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 👍 Allowed
  return children;
};

export default ProtectedRoute;
