import React from "react";
import MainNavbar from "./mainNavbar";
import "../CSS/FeaturesPage.css";
import expenseImage from "../Images/expenseImage.png";

function Features() {
  return (
    <div className="features-container">
      <MainNavbar />
      <h1>Features</h1>
      <div className="feature">
        <img
          src={expenseImage}
          alt="Income Management"
          className="feature-image"
        />
        <div className="feature-details">
          <h2>Income Management</h2>
          <p>Track your income sources and manage them efficiently.</p>
        </div>
      </div>
      <div className="feature">
        <img
          src={expenseImage}
          alt="Expense Tracking"
          className="feature-image"
        />
        <div className="feature-details">
          <h2>Expense Tracking</h2>
          <p>
            Record and categorize your expenses for better financial planning.
          </p>
        </div>
      </div>
      <div className="feature">
        <img
          src={expenseImage}
          alt="Account Management"
          className="feature-image"
        />
        <div className="feature-details">
          <h2>Account Management</h2>
          <p>Manage multiple accounts and keep track of their balances.</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
