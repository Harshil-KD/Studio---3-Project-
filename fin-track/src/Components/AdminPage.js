import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "./Firebase/Auth";
import VectorLogo from "../Images/Vector_Logo_White.png";
import "../CSS/userNavbar.css";
 
function AdminPage() {
 
  const handleLogout = async () => {
    try {
      await doSignOut(); // Call the logout function
      navigate("/"); // Navigate to the home page
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
    } catch (error) {
      console.log("Failed to log out:", error.message);
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
 
          <Link to="/" className="navbar-brand">
            <img src={VectorLogo} className="img-fluid" alt="brand-logo" />{" "}
            FinTrack
          </Link>
 
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
 
            <div className="d-flex">
              {/* Call handleLogout function when the logout button is clicked */}
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
 
export default AdminPage;