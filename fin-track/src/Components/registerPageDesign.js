import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import { db } from "./Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from "./Firebase/Auth";
import "../CSS/loginPageDesign.css";
import loginBg from "../Images/login-bg.png";
import MainNavbar from "./mainNavbar";

function RegisterPageDesign() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    setIsRegistering(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      await addUserToDatabase(); // Add user data to Firestore after successful registration
      navigate("/login"); // Or navigate to any page you'd like the user to go to after registration
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsRegistering(false);
    }
  };
  

  const addUserToDatabase = async () => {
    const collectionRef = collection(db, "users");
    const userData = {
      Full_Name: fullName,
      Address: address,
      Email: email,
      Type: "trial"
    };
  
    try {
      const docRef = await addDoc(collectionRef, userData);
      console.log("User added with ID: ", docRef.id);
      console.log("User data added to Firestore: ", userData);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <div>
      <MainNavbar/>
      <Container
        fluid
        className="register-container"
        style={{
          backgroundColor: "#9600DC",
          color: "white",
          background: "linear-gradient(to right, #23102e, #432057, #9600DC, #9600DC, #9600DC, #9600DC)",
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
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
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
                  <label htmlFor="inputRetypePassword" className="form-label label">
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

                <button type="submit" className="custom-button mb-3" disabled={isRegistering}>
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
