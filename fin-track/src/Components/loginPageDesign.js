import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "../CSS/loginPageDesign.css";
import VectorLogo from "../Images/Vector_Logo.png";
import loginBg from "../Images/login-bg.png";

function LoginPageDesign() {
  return (
    <div>

      <Navbar 
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          background: "linear-gradient(to right, black 10%, #9600DC 60%, #9600DC)"
        }}
        variant="dark"
        expand="lg">
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
        className="login-container"
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          background: "linear-gradient(to right, black 15%, #9600DC 60%, #9600DC)"
        }}
        
      >
        <h1 className="login-title">Login</h1>
        <p className="login-description">Login to your account.</p>
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

                <div className="mb-4">
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

                <div className="login mt-5">
                  <button id="loginSubmit" size="lg" className="custom-button mb-3">Log In</button> <br/>
                  <button id="register" size="lg" className="custom-button">Register</button>
                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPageDesign;
