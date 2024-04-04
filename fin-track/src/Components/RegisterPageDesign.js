import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { db } from "./Firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "./Firebase/Auth";
import "../CSS/RegisterPageDesign.css";
import VectorLogo from "../Images/Vector_Logo.png";
import loginBg from "../Images/login-bg.png";

/**
 * Functional component representing the registration page.
 */
function RegisterPageDesign() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password input
  const [fullName, setFullName] = useState(""); // State for full name input
  const [address, setAddress] = useState(""); // State for address input
  const [isRegistering, setIsRegistering] = useState(false); // State for tracking registration process
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Set isRegistering to true to indicate registration process is ongoing
    setIsRegistering(true);
    try {
      // Call the registration function from Firebase Auth
      await doCreateUserWithEmailAndPassword(email, password);
      
      // Add user data to Firestore after successful registration
      await addUserToDatabase();

      // Navigate to user overview page after successful registration
      navigate("/userOverview");
    } catch (error) {
      // Set error message if registration fails
      setErrorMessage(error.message);
    } finally {
      // Set isRegistering back to false after registration process is complete
      setIsRegistering(false);
    }
  };

  // Function to add user data to Firestore
  const addUserToDatabase = async () => {
    const collectionRef = collection(db, "users");
    const userData = {
      Full_Name: fullName,
      Address: address,
      Email: email,
      Type: "trial",
    };

    try {
      await addDoc(collectionRef, userData);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
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
          <Navbar.Brand href="#">
            <img
              src={VectorLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Navbar Logo"
            />{" "}
            FinTrack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
        </Container>
      </Navbar>

      {/* Registration Container */}
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

      {/* Registration Form */}
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
              {/* Display error message if there's any */}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              {/* Registration Form */}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label label">
                    <h4 className="label">Full Name:</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control label"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    required
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="inputPassword" className="form-label label">
                    <h4 className="label">Password:</h4>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="inputRetypePassword"
                    className="form-label label"
                  >
                    <h4 className="label">Retype Password:</h4>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputRetypePassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Retype your password"
                    required
                  />
                </div>

                {/* Registration Button */}
                <button
                  type="submit"
                  className="custom-button mb-3"
                  disabled={isRegistering}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPageDesign;
