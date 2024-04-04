import React from "react";
import { Navigate } from "react-router-dom";

// A generic protected route component
const ProtectedRoute = ({ children }) => {
  return children; // Renders children components
};

// Route for Admin users
export const AdminRoute = ({ children }) => {
  // Check user type stored in local storage
  const userType = localStorage.getItem("userType");
  // If user type is not set, redirect to homepage
  if (userType === null) {
    return <Navigate to="/" />;
  } else {
    // If user type is admin, render children components
    if (userType === "admin") {
      return children;
    } else {
      // If user type is not admin, display message
      return <>You do not have access to this page</>;
    }
  }
};

// Route for Trial users
export const RegisterUserRoute = ({ children }) => {
  // Check user type stored in local storage
  const userType = localStorage.getItem("userType");
  // If user type is not set, redirect to homepage
  if (userType === null) {
    return <Navigate to="/" />;
  } else {
    // If user type is trial, render children components
    if (userType === "trial") {
      return children;
    } else {
      // If user type is not trial, display message
      return <>You do not have access to this page</>;
    }
  }
};

export default ProtectedRoute; // Export the ProtectedRoute component
