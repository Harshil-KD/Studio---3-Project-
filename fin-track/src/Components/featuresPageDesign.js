import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import "../CSS/featurePage.css";
import MainNavbar from "./mainNavbar";

function featuresPage() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Body Navbar */}
      <MainNavbar />

      {/* Body 1 */}
      <div className="grid text-center">
      <Row>

      </Row>
      </div>
      {/* Body 2 */}
      <div className="grid text-center">

      </div>

      {/* Body 3 */}
      <div className="row body3">

      </div>

      {/* Body 4 */}
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ margin: '20px 0' }}>
        
      </div>



    </div>
  );
}

export default featuresPage;