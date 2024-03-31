import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "./Firebase/Auth";
import { db } from "./Firebase/firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import VectorLogo from "../Images/Vector_Logo_White.png";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../CSS/userNavbar.css";
 
function AdminPage() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({ id: "", Full_Name: "", Email: "", Type: "" });
  const [showModal, setShowModal] = useState(false);
 
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
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    });
 
    return () => unsubscribe();
  }, []);
 
  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      console.log("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
 
  const updateUser = async () => {
    try {
      await updateDoc(doc(db, "users", editUser.id), {
        Full_Name: editUser.Full_Name,
        Type: editUser.Type
      });
      console.log("User updated successfully.");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
 
  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
  };
 
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
            <th>Name</th>
            <th>Email</th>
            <th>Account Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.Full_Name}</td>
              <td>{user.Email}</td>
              <td>{user.Type}</td>
              <td>
                <button key={`edit-${index}`} onClick={() => handleEdit(user)}>
                  Edit
                </button>
              </td>
              <td>
                <button key={`delete-${index}`} onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
 
      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => {
            e.preventDefault();
            updateUser();
          }}>
            <div>
              <label htmlFor="edit-fullname">Full Name:</label>
              <input type="text" id="edit-fullname" name="Full_Name" value={editUser.Full_Name} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="edit-account-type">Account Type:</label>
              <input type="text" id="edit-account-type" name="Type" value={editUser.Type} onChange={handleInputChange} />
            </div>
            <button type="submit">Update</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
 
export default AdminPage;