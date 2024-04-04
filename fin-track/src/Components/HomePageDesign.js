import React from "react";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation

import "../CSS/HomePageDesign.css"; // Importing CSS file for styling
import MainNavbar from "./mainNavbar"; // Importing MainNavbar component

import carouselImage1 from "../Images/Financial_manager1.jpeg"; // Importing carousel images
import carouselImage2 from "../Images/Financial_manager.jpg";
import carouselImage3 from "../Images/Financial_manager3.jpeg";
import ChartImage from "../Images/ChartImage.svg"; // Importing other images for the body
import fileImage from "../Images/fileImage.svg";
import CardImage1 from "../Images/CardImage1.svg";
import CardImage2 from "../Images/CardImage2.svg";
import CardImage3 from "../Images/CardImage3.svg";

/**
 * Functional component representing the home page design.
 * Displays various sections with descriptions and images to showcase the features of the application.
 */
function HomePageDesign() {
  return (
    <div>
      {/* Body Navbar */}
      <MainNavbar /> {/* Render the main navigation bar */}

      {/* Body 1: Track Your Money */}
      <div className="grid text-center">
        <div className="g-col-6">
          <h1 className="display-1">Track Your Money</h1> {/* Main heading */}
          <p>Connect all your transactions to FinTrack.</p> {/* Description */}
          <Link to="/register" className="btn custom-btn-outline">
            Use It Now ! {/* Button to register */}
          </Link>
        </div>

        <div className="g-col-6">
          {/* Carousel for displaying images */}
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="2500"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={carouselImage1} className="d-block" alt="carousel1" />
              </div>
              <div className="carousel-item">
                <img src={carouselImage2} className="d-block" alt="carousel2" />
              </div>
              <div className="carousel-item">
                <img src={carouselImage3} className="d-block" alt="carousel3" />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Body 2: Manage Your Expenses */}
      <div className="grid text-center">
        <div className="g-col-6">
          <h1 className="display-4">Manage Your Expenses</h1> {/* Main heading */}
          <p>Set smart budgets to avoid overspending.</p> {/* Description */}
          <Link to="/register" className="btn custom-btn-outline">
            Use It Now ! {/* Button to register */}
          </Link>
        </div>

        <div className="g-col-6">
          <img
            src={ChartImage}
            className="rounded mx-auto d-block1"
            alt="Chart"
          /> {/* Image */}
        </div>
      </div>

      {/* Body 3: Income and Expense Tracking */}
      <div className="row body3">
        <div className="col-4">
          <img src={fileImage} className="rounded mx-auto d-block" alt="Chart" />
          
        </div>

        <div className="col-8 body3content">
          <h1 className="display-5">
            Income and Expense Tracking From a Single Screen
          </h1> {/* Main heading */}
          <p className="text-center">Get started with a free trial!</p> {/* Description */}
          <Link to="/register" className="btn custom-btn-outline">
            Use It Now ! {/* Button to register */}
          </Link>
        </div>
      </div>

      {/* Body 4: Additional Features */}
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ margin: '20px 0' }}>
        {/* Card 1: See what you spend on the most */}
        <div className="col" style={{ padding: '0 15px' }}>
          <div className="card" style={{ backgroundColor: '#fff', margin: '20px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src={CardImage1} className="card-img-top" alt="Wallet" />
            <div className="card-body">
              <h5 className="card-title">See what you spend on the most</h5> {/* Card title */}
              <p className="card-text">
                Regularly track which items you spend the most money on for your business.
              </p> {/* Card description */}
            </div>
          </div>
        </div>
        {/* Card 2: Add Income/Expenses by Category */}
        <div className="col" style={{ padding: '0 15px' }}>
          <div className="card" style={{ backgroundColor: '#fff', margin: '20px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src={CardImage2} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Add Income/Expenses by Category</h5> {/* Card title */}
              <p className="card-text">
                Add your transactions by different types of categories such as Food, Transport, etc.
              </p> {/* Card description */}
            </div>
          </div>
        </div>
        {/* Card 3: Get the Transactions Summary */}
        <div className="col" style={{ padding: '0 15px' }}>
          <div className="card" style={{ backgroundColor: '#fff', margin: '20px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src={CardImage3} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Get the Transactions Summary</h5> {/* Card title */}
              <p className="card-text">
                Get a summary of your transactions weekly, monthly, annually.
              </p> {/* Card description */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageDesign;
