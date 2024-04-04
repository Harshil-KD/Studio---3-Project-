import React from "react";
import MainNavbar from "./mainNavbar"; // Importing the main navigation bar component
import "../CSS/FeaturesPage.css"; // Importing the CSS file for styling
import expenseImage from "../Images/expenseImage.png"; // Importing the expense image

/**
 * Functional component representing the features page of the application.
 * Displays various features with descriptions and accompanying images.
 */
function Features() {
  return (
    <div className="features-container"> {/* Container for the features page */}
      <MainNavbar /> {/* Main navigation bar component */}
      <h1>Features</h1> {/* Main heading */}
      
      {/* First feature section: Income Management */}
      <div className="feature">
        <img
          src={expenseImage}
          alt="Income Management"
          className="feature-image"
        />
        <div className="feature-details">
          <h2>Income Management</h2> {/* Feature title */}
          <p>Track your income sources and manage them efficiently.</p> {/* Feature description */}
        </div>
      </div>

      {/* Second feature section: Expense Tracking */}
      <div className="feature">
        <img
          src={expenseImage}
          alt="Expense Tracking"
          className="feature-image"
        />
        <div className="feature-details">
          <h2>Expense Tracking</h2> {/* Feature title */}
          <p>
            Record and categorize your expenses for better financial planning.
          </p> {/* Feature description */}
        </div>
      </div>

      {/* Third feature section: Account Management */}
      <div className="feature">
        <img
          src={expenseImage}
          alt="Account Management"
          className="feature-image"
        />
        <div className="feature-details">
          <h2>Account Management</h2> {/* Feature title */}
          <p>Manage multiple accounts and keep track of their balances.</p> {/* Feature description */}
        </div>
      </div>
    </div>
  );
}

export default Features;
