import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  "./Components/Firebase/firebase.js";
import LoginPageDesign from "./Components/loginPageDesign.js";
import RegisterPageDesign from "./Components/registerPageDesign.js";
import HomePageDesign from "./Components/homePageDesign.js";
import UserAccountPage from "./Components/UserAccountPage.js";
import UserOverviewPage from "./Components/UserOverviewPage.js";
import UserSummaryPage from "./Components/UserSummaryPage.js";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPageDesign />} />
          <Route path="/register" element={<RegisterPageDesign />} />
          <Route path="/" element={<HomePageDesign />} />
          <Route path="/features" element={<Features />} /> 
          <Route path="/userAccount" element={<UserAccountPage />} />
          <Route path="/userOverview" element={<UserOverviewPage />} />
          <Route path="/userSummary" element={<UserSummaryPage />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
