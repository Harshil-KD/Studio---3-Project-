import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserId } from "./Firebase/userContext";

import {
  doSignInUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "./Firebase/Auth"; // Adjust the import path as necessary
import { db } from "./Firebase/firebase";
import { getDocs, where, query, collection } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import "../CSS/loginPageDesign.css";
import VectorLogo from "../Images/Vector_Logo.png";
import loginBg from "../Images/login-bg.png";

function LoginPageDesign() {
  const navigate = useNavigate(); // Use for navigation after login
  const { userId, setUserId } = useUserId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitEmailPassword = async (e) => {
    e.preventDefault();
    if (!email || !password || isSigningIn) {
      return;
    }
    setIsSigningIn(true);
    try {
      // Sign in user with email and password
      await doSignInUserWithEmailAndPassword(email, password);

      // Query Firestore for user document based on email
      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("Email", "==", email));
      const snapshot = await getDocs(q);

      console.log("Snapshot:", snapshot);

      if (!snapshot.empty) {
        // Get the first document (assuming email is unique)
        const userDoc = snapshot.docs[0];
        // Set the userId
        setUserId(userDoc.id);
        console.log(userId);
        console.log("User ID:", userDoc.id);

        navigate("/userAccount"); // Navigate to user account page upon successful login
      } else {
        // User not found
        setErrorMessage("User not found.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      // Sign in with Google
      const userCredential = await doSignInWithGoogle();

      // Navigate to register page with pre-filled data
      navigate("/userOverview");
      console.log(userCredential.user.email, userCredential.user.displayName);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          backgroundImage:
            "linear-gradient(to right, #23102e, #432057, #9600DC, #9600DC, #9600DC, #9600DC)",
        }}
        variant="dark"
        expand="lg"
      >
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
        className="login-container"
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          backgroundImage:
            "linear-gradient(to right, #23102e, #432057, #9600DC, #9600DC, #9600DC, #9600DC)",
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
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="login mt-5">
                  <button
                    id="loginSubmit"
                    onClick={onSubmitEmailPassword}
                    disabled={isSigningIn}
                    className="custom-button mb-3"
                  >
                    Login with Email
                  </button>
                  <button
                    id="googleSignIn"
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                    className="custom-button mb-3"
                  >
                    Sign in with Google
                  </button>
                  {/* Error Message Display */}
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                  <br />
                  <Link to="/register">
                    <button id="register" size="lg" className="custom-button">
                      Register
                    </button>
                  </Link>
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