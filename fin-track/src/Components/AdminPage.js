import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "./Firebase/Auth";
import { db } from "./Firebase/Firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import VectorLogo from "../Images/Vector_Logo_White.png";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../CSS/userNavbar.css";
import "../CSS/AdminPage.css";


function AdminPage() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [users, setUsers] = useState([]); // State variable to store user data
  const [editUser, setEditUser] = useState({ id: "", Full_Name: "", Email: "", Type: "" }); // State variable to store data of the user being edited
  const [showModal, setShowModal] = useState(false); // State variable to control the visibility of the edit user modal

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await doSignOut(); // Call the logout function
      navigate("/"); // Navigate to the home page
      localStorage.removeItem("userId"); // Remove userId from localStorage
      localStorage.removeItem("userType"); // Remove userType from localStorage
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  // Fetch user data from the database on component mount
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

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to update user data
  const updateUser = async () => {
    try {
      await updateDoc(doc(db, "users", editUser.id), {
        Full_Name: editUser.Full_Name,
        Type: editUser.Type
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Function to handle editing a user
  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  // Function to handle input change in the edit user modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
  };

  return (
    <div>
      {/* Navigation bar */}
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

          {/* Brand logo and name */}
          <Link to="/" className="navbar-brand">
            <img src={VectorLogo} className="img-fluid" alt="brand-logo" />{" "}
            FinTrack
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <div className="d-flex">
              {/* Log out button */}
              <button className="btn custom-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Table displaying user data */}
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
                {/* Edit button */}
                <button key={`edit-${index}`} onClick={() => handleEdit(user)}>
                  Edit
                </button>
              </td>
              <td>
                {/* Delete button */}
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
