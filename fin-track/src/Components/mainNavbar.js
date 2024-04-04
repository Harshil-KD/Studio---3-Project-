import React from "react";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import "../CSS/mainNavbar.css"; // Importing CSS file for styling
import VectorLogo from "../Images/Vector_Logo_White.png"; // Importing vector logo image

function MainNavbar() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Brand Logo */}
          <Link to="/" className="navbar-brand">
            <img src={VectorLogo} className="img-fluid" alt="brand-logo" />{" "}
            FinTrack
          </Link>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Home Link */}
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>

              {/* Features Link */}
              <li className="nav-item">
                <Link to="/features" className="nav-link">
                  Features
                </Link>
              </li>

              {/* About Link */}
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
            </ul>

            {/* Login and Register Buttons */}
            <div className="d-flex">
              <Link to="/login" className="btn custom-btn">
                Log In
              </Link>

              <Link to="/register" className="btn custom-btn">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MainNavbar;
