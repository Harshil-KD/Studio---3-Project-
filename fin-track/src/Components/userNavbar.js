import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "./Firebase/Auth";
import VectorLogo from "../Images/Vector_Logo_White.png";
import "../CSS/userNavbar.css";

/**
 * Functional component representing the navigation bar for authenticated users.
 */
function UserNavbar() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  //Function to handle user logout
  const handleLogout = async () => {
    try {
      await doSignOut(); // Call the logout function
      localStorage.removeItem("userId"); // Remove user ID from local storage
      localStorage.removeItem("userType"); // Remove user type from local storage
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

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

          {/* Brand logo */}
          <Link to="/" className="navbar-brand">
            <img src={VectorLogo} className="img-fluid" alt="brand-logo" />{" "}
            FinTrack
          </Link>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/userOverview"
                  className="nav-link active"
                  aria-current="page"
                >
                  Overview
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/userAccount" className="nav-link">
                  Accounts
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/userSummary" className="nav-link">
                  Summary
                </Link>
              </li>
            </ul>

            {/* Logout button */}
            <div className="d-flex">
              <button className="btn custom-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserNavbar;
