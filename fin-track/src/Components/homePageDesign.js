import React from "react";

import { Link } from "react-router-dom";

import "../CSS/homePageDesign.css";
import MainNavbar from "./mainNavbar";

import carouselImage1 from "../Images/Financial_manager1.jpeg";
import carouselImage2 from "../Images/Financial_manager.jpg";
import carouselImage3 from "../Images/Financial_manager3.jpeg";
import ChartImage from "../Images/ChartImage.png";
import FileIcon from "../Images/FileIcon.png";

function HomePageDesign() {
  return (
    <div>
      {/* Body Navbar */}
      <MainNavbar />

      {/* Body 1 */}
      <div className="grid text-center">
        <div className="g-col-6">
          <h1 className="display-1">Track Your Money</h1>
          <p>lorem900</p>
          <Link to="/register" className="btn custom-btn-outline">
            Use It Now !
          </Link>
        </div>

        <div className="g-col-6">
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

      {/* Body 2 */}
      <div className="grid text-center">
        <div className="g-col-6">
          <h1 className="display-4">Manage Your Expenses</h1>
          <p>lorem900</p>
        </div>

        <div className="g-col-6">
          <img
            src={ChartImage}
            className="rounded mx-auto d-block"
            alt="Chart"
          />
        </div>
      </div>

      {/* Body 3 */}
      <div className="row body3">
        <div className="col-4">
          <img src={FileIcon} className="rounded mx-auto d-block" alt="Chart" />
        </div>

        <div className="col-8 body3content">
          <h1 className="display-5">
            Income and Expense Tracking From A Single Screen
          </h1>

          <p className="text-center">Get a free trial now!</p>
          <Link to="/register" className="btn custom-btn-outline">
            Use It Now !
          </Link>
        </div>
      </div>

      {/* Body 4 */}
      <div className="row row-cols-1 row-cols-sm  -3 g-4">
        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageDesign;
