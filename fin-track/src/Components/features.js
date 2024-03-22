import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./mainNavbar";
import "../CSS/features.css";
import feature from "../Images/features.jpg";
import CardImage1 from "../Images/CardImage1.svg";
import CardImage2 from "../Images/CardImage2.svg";
import CardImage3 from "../Images/CardImage3.svg";

function Features() {
    return (
        <>
            <MainNavbar />
            <div className="grid text-center">
                <div className="g-col-6">
                    <div className="content">
                        <h1 className="display-1">Robust Functionality</h1>
                        <p>Premium users enjoy enhanced features and benefits to streamline their financial management processes.</p>
                        <Link to="/register" className="btn custom-btn-outline">Use It Now !</Link>
                    </div>
                </div>
                <div className="g-col-6">
                    <img src={feature} alt="Feature" className="feature-image image" />
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{ margin: '20px 0' }}>
                <div className="col" style={{ padding: '0 15px' }}>
                    <div className="card" style={{ backgroundColor: '#fff', margin: '20px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <img src={CardImage2} className="card-img-top" alt="Wallet" />

                        <div className="card-body">
                            <h5 className="card-title">Manage Accounts</h5>
                            <p className="card-text">
                                Track income, expenses, and profits for your business with ease.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col" style={{ padding: '0 15px' }}>
                    <div className="card" style={{ backgroundColor: '#fff', margin: '20px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <img src={CardImage1} className="card-img-top" alt="Wallet" />

                        <div className="card-body">
                            <h5 className="card-title">Custom User Profiles</h5>
                            <p className="card-text">
                                Set up personalized accounts for different user types, including administrators, employees, and customers.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col" style={{ padding: '0 15px' }}>
                    <div className="card" style={{ backgroundColor: '#fff', margin: '20px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <img src={CardImage3} className="card-img-top" alt="Wallet" />

                        <div className="card-body">
                            <h5 className="card-title">Profit & Loss Analysis</h5>
                            <p className="card-text">
                                Analyze financial performance, identify trends, and make informed decisions based on comprehensive profit and loss reports.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

import MainNavbar from "./mainNavbar";
import "../CSS/featuresPage.css";
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
      {/* Add more features as needed */}
    </div>
  );
}

export default Features;
