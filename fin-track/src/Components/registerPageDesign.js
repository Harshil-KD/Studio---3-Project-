import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, /*useNavigate*/ } from 'react-router-dom';
import "./Firebase/Auth"
import "../CSS/loginPageDesign.css";
import VectorLogo from "../Images/Vector_Logo.png";
import loginBg from "../Images/login-bg.png";

// import { useAuth } from "./Firebase/AuthContext";
import { doCreateUserWithEmailAndPassword } from "./Firebase/Auth";

function RegisterPageDesign() {

  // const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  // const {userLoggedIn} = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isRegistering) {
        setIsRegistering(true)
        await doCreateUserWithEmailAndPassword(email, password)
    }
}

  return (
    <div>

      <Navbar 
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          background: "linear-gradient(to right, #23102e, #432057, #9600DC, #9600DC, #9600DC, #9600DC)"
        }}
        variant="dark"
        expand="lg">
        <Container fluid className="forNavbar">
          {/* Title Bar Design Logo*/}
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

          {/* TitleBar Toggler for mobile view */}
          <Navbar.Toggle aria-controls="navbar-nav" />
        </Container>
      </Navbar>

      {/* Welcome Container with TitleBar background color */}
      <Container
        fluid
        className="register-container"
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          background: "linear-gradient(to right, #23102e, #432057, #9600DC, #9600DC, #9600DC, #9600DC)"
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
                    aria-required='true'
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {setFullName(e.target.value);}}
                    id="fullName"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label label">
                    <h4 className="label">Address</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control label"
                    id="address"
                    autoComplete="address"
                    value={address}
                    aria-required='true'
                    onChange={(e) => {setAddress(e.target.value)}}
                    placeholder="Enter your address"
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
                    autoComplete="email"
                    value={email}
                    aria-required='true'
                    onChange={(e) => {setEmail(e.target.value)}}
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
                    value={password}
                    autoComplete="new-password"
                    aria-required='true'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="inputRetypePassword" className="form-label label">
                    <h4 className="label"> Retype Password:</h4>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputRetypePassword"
                    aria-required='true'
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="login mt-5">
                  <button id="register" size="lg" className="custom-button" disabled={isRegistering} onClick={onSubmit}><Link to="/login">Register</Link></button>
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
