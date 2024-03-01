import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "../CSS/registerPageDesign.css";
import VectorLogo from "../Images/Vector_Logo.png";
import loginBg from "../Images/login-bg.png";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function RegisterPageDesign() {
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          background:
            "linear-gradient(to right, #23102e, #432057, #9600DC, #9600DC, #9600DC, #9600DC)",
        }}
        variant="dark"
        expand="lg"
      >
        <Container fluid className="forNavbar">
          {/* Navbar Logo */}
          <Navbar.Brand href="#">
            <img
              src={VectorLogo}
              width="30"
              height="30"
              alt="Navbar Logo"
              className="d-inline-block align-top"
            />{" "}
            FinTrack
          </Navbar.Brand>

          {/* Navbar Toggler for mobile view */}
          <Navbar.Toggle aria-controls="navbar-nav" />
        </Container>
      </Navbar>

      {/* Welcome Container with Navbar background color */}
      <Container
        fluid
        className="register-container"
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          background:
            "linear-gradient(to right, #23102e, #432057, #9600DC, #9600DC, #9600DC, #9600DC)",
        }}
      >
        <h1 className="register-title">SignUp</h1>
        <p className="register-description">Register to create your account.</p>
      </Container>

      <div className="container px-9 text-center">

        <div className="row gx-5">

          <div className="col">
            <div className="p-3">
              <div className="text-center">
                <img src={loginBg} className="rounded img-fluid" alt="..." />
              </div>
            </div>
          </div>

          <div className="col colForm">

            <div className="p-3">

              <form action="">

                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label label">
                    <h4 className="label">Full Name:</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control label"
                    id="fullName"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label label">
                    <h4 className="label">Address:</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control label"
                    id="address"
                    placeholder="Enter your residential address"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label label">
                    <h4 className="label">Email Address:</h4>
                  </label>
                  <input
                    type="email"
                    className="form-control label"
                    id="inputEmail"
                    placeholder="Enter your mail address"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label label">
                    <h4 className="label"> Password:</h4>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label label">
                    <h4 className="label"> Retype Password:</h4>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Enter your password"
                  />
                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterPageDesign;
