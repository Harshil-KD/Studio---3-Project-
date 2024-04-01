import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserId } from "./Firebase/userContext";

import {
  doSignInUserWithEmailAndPassword,
  doSignInWithGoogle,
  checkUserExists,
} from "./Firebase/Auth"; // Adjust the import path as necessary
import { db } from "./Firebase/firebase";
import { getDocs, where, query, collection } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "../CSS/loginPageDesign.css";
import loginBg from "../Images/login-bg.png";
import MainNavbar from "./mainNavbar";


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

      const results = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Set the userId
      setUserId(results[0].id);
      console.log(userId)

      navigate("/userAccount"); // Navigate to user overview page upon successful login
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
      const user = await doSignInWithGoogle();
      const userExists = await checkUserExists(user.email);

      if (userExists) {
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("Email", "==", email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const results = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          if (results.length === 1) {
            // Set the userId if only one result is found
            setUserId(results[0].id);
            console.log(userId);
            navigate("/userOverview");
          } else {
            // Handle multiple results
            // You may want to display an error message or log the issue
            console.error("Multiple users found with the same email");
            setErrorMessage("Multiple users found with the same email. Please contact support.");
          }
        } else {
          // Navigate to register if no user found
          navigate("/register");
        }
      } else {
        // Navigate to register if user doesn't exist
        navigate("/register");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };



  return (
    <div>
     <MainNavbar/>

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