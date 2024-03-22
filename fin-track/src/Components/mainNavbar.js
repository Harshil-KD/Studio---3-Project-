import React from "react";
import { Link } from "react-router-dom";
import "../CSS/mainNavbar.css";
import VectorLogo from "../Images/Vector_Logo_White.png";

function MainNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
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

          <Link to="/" className="navbar-brand">
            <img src={VectorLogo} className="img-fluid" alt="brand-logo" />{" "}
            FinTrack
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/features" className="nav-link">
                  Features
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
            </ul>

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
