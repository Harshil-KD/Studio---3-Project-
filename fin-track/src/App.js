import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Components/Firebase/Firebase.js";
import LoginPageDesign from "./Components/LoginPageDesign.js";
import RegisterPageDesign from "./Components/RegisterPageDesign.js";
import HomePageDesign from "./Components/HomePageDesign.js";
import UserAccountPage from "./Components/UserAccountPage.js";
import UserOverviewPage from "./Components/UserOverviewPage.js";
import UserSummaryPage from "./Components/UserSummaryPage.js";
import Features from "./Components/Features.js";
import About from "./Components/About.js";
import AdminPage from "./Components/AdminPage.js";
import ProtectedRoute, {
  AdminRoute,
  RegisterUserRoute,
} from "./Components/Firebase/ProtectedRoute.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPageDesign />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <RegisterPageDesign />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePageDesign />
              </ProtectedRoute>
            }
          />
          <Route
            path="/features"
            element={
              <ProtectedRoute>
                <Features />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userAccount"
            element={
              <RegisterUserRoute>
                <UserAccountPage />
              </RegisterUserRoute>
            }
          />
          <Route
            path="/userOverview"
            element={
              <RegisterUserRoute>
                <UserOverviewPage />
              </RegisterUserRoute>
            }
          />
          <Route
            path="/userSummary"
            element={
              <RegisterUserRoute>
                <UserSummaryPage />
              </RegisterUserRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;