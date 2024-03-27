import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./mainNavbar";
import "../CSS/featuresPage.css";
import expenseImage from "../Images/expenseImage.png";

function Features() {
  return (
    <>
      <MainNavbar />
      <div className="features-container">
        <h1>Features</h1>
        {/* Single feature section */}
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
        {/* Single feature section */}
        <div className="feature">
          <img
            src={expenseImage}
            alt="Expense Tracking"
            className="feature-image"
          />
          <div className="feature-details">
            <h2>Expense Tracking</h2>
            <p>
              Record and categorize your expenses for better financial
              planning.
            </p>
          </div>
        </div>
        {/* Single feature section */}
        <div className="feature">
          <img
            src={expenseImage}
            alt="Account Management"
            className="feature-image"
          />
          <div className="feature-details">
            <h2>Account Management</h2>
            <p>
              Manage multiple accounts and keep track of their balances.
            </p>
          </div>
        </div>
       
 
</div>
    </>
  );
}

export default Features;
