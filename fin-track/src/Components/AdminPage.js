import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "./Firebase/Auth";
import { db } from "./Firebase/Firebase";
import VectorLogo from "../Images/Vector_Logo_White.png";
import Table from 'react-bootstrap/Table';
import "../CSS/userNavbar.css";
 
function AdminPage() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [users, setUsers] = useState([]);
 
  const handleLogout = async () => {
    try {
      await doSignOut(); // Call the logout function
      navigate("/"); // Navigate to the home page
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
    } catch (error) {
      console.log("Failed to log out:", error.message);
    }
  };
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = db.collection("users");
        const snapshot = await usersRef.get();
        const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
 
  return (
   
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
 
          <Link to="/" className="navbar-brand">
            <img src={VectorLogo} className="img-fluid" alt="brand-logo" />{" "}
            FinTrack
          </Link>
 
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
 
            <div className="d-flex">
              {/* Call handleLogout function when the logout button is clicked */}
              <button className="btn custom-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
 
          </div>
        </div>
      </nav>
 
      <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: 12 }).map((_, index) => (
            <th key={index}>Table heading</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>3</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
 
    </div>
  );
}
 
export default AdminPage; 