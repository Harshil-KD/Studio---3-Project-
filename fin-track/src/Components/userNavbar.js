import React from 'react'
import { Link } from 'react-router-dom'
import VectorLogo from "../Images/Vector_Logo_White.png";
import "../CSS/userNavbar.css"

function UserNavbar() {
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
                <Link to="/userOverview" className="nav-link active" aria-current="page">
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

            <div className="d-flex">
              <Link to="/" className="btn custom-btn">
                Log Out
              </Link>

              
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default UserNavbar;
