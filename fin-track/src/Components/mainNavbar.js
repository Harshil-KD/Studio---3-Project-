import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from 'react-router-dom';

import "../CSS/mainNavbar.css";

import VectorLogo from "../Images/Vector_Logo_White.png";

function MainNavbar() {
  return (
    <div>
      <Navbar className="navbar">
        <Container fluid className="nav-brand">
          <Navbar.Brand href="#home">
            <img
              src={VectorLogo}
              width="30"
              height="30"
              alt="Navbar Logo"
              className="d-inline-block align-top"
            />{" "}
            FinTrack
          </Navbar.Brand>
        </Container>

        <Container fluid className="nav-links">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
          </Nav>
        </Container>

        <Container fluid className="nav-buttons">
          <button type="button" class="btn btn-light btn-login">
          <Link to="/login">Login</Link>
          </button>

          <button type="button" class="btn btn-light btn-register">
          <Link to="/register">Register</Link>
          </button>
        </Container>
      </Navbar>
    </div>
  )
}

export default MainNavbar;