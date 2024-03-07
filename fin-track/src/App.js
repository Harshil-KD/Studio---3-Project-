import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPageDesign from "./Components/loginPageDesign.js";
import RegisterPageDesign from "./Components/registerPageDesign.js";
import HomePageDesign from "./Components/homePageDesign.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPageDesign />} />
          <Route path="/register" element={<RegisterPageDesign />} />
          <Route path="/" element={<HomePageDesign />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
