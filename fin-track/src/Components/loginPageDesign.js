import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  doSignInUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "./Firebase/Auth"; // Adjust the import path as necessary
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import MainNavbar from "./mainNavbar";
import "../CSS/loginPageDesign.css";
import loginBg from "../Images/login-bg.png";

function LoginPageDesign() {
  const navigate = useNavigate(); // Use for navigation after login
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
      await doSignInUserWithEmailAndPassword(email, password);
      navigate("/userOverview"); // Navigate to user overview page upon successful login
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
      navigate("/userOverview");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div>
       <MainNavbar />

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

// const onSubmit = async (e) => {
//   e.preventDefault();

//   // Validation checks
//   if (!email || !password || isSigningIn) {
//     return;
//   }

//   setIsSigningIn(true);

//   try {
//     // Attempt to sign in
//     const userCredential = await doSignInUserWithEmailAndPassword(email, password);

//     // Retrieve user data from Firestore
//     const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
//     const userData = userDoc.data();

//     setIsSigningIn(false);

//     // Redirect based on user role
//     if (userData) {
//       if (userData.role === "admin") {
//         history.push("/admin");
//       } else if (userData.role === "premium" || userData.role === "registered") {
//         history.push("/overview");
//       } else {
//         // Handle other roles or set a default redirect
//         history.push("/overview");
//       }
//     }
//   } catch (error) {
//     // Handle errors
//     setErrorMessage(error.message);
//     setIsSigningIn(false);
//   }
// };
