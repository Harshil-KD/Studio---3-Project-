import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return children;
};

export const AdminRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  if (userType === null) {
    return <Navigate to="/" />;
  } else {
    if (userType === "admin") {
      return children;
    } else {
      return <>You do not have access to this page</>;
    }
  }
};

export const RegisterUserRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  if (userType === null) {
    return <Navigate to="/" />;
  } else {
    if (userType === "trial") {
      return children;
    } else {
      return <>You do not have access to this page</>;
    }
  }
};

export default ProtectedRoute;