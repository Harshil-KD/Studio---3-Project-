import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/UserContext"; // Importing custom hook to get user ID
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Importing Firestore functions
import { db } from "../Firebase/Firebase"; // Importing Firestore database instance
import Button from "react-bootstrap/Button"; // Importing Bootstrap Button component
import Modal from "react-bootstrap/Modal"; // Importing Bootstrap Modal component
import Table from "react-bootstrap/Table"; // Importing Bootstrap Table component

// Component to manage user accounts
function UserAccountModal() {
  const [show, setShow] = useState(false); // State for showing/hiding the modal
  const [accountName, setAccountName] = useState(""); // State for account name input
  const [accountNumber, setAccountNumber] = useState(""); // State for account number input
  const [accountType, setAccountType] = useState("cheque"); // State for account type selection
  const [accountBalance, setAccountBalance] = useState(""); // State for account balance input
  const [accounts, setAccounts] = useState([]); // State for user accounts

  const [editAccount, setEditAccount] = useState(null); // State for account being edited
  const [mode, setMode] = useState("add"); // State for current mode (add/edit)
  const { userId } = useUserId(); // Custom hook to get user ID

  // Function to show the modal
  const handleShow = () => setShow(true);
  
  // Function to hide the modal and clear form inputs
  const handleClose = () => {
    setShow(false);
    clearForm();
  };

  // Function to clear form inputs
  const clearForm = () => {
    setAccountName("");
    setAccountNumber("");
    setAccountType("cheque");
    setAccountBalance("");
  };

  // Function to add a new account
  const handleAddAccount = async () => {
    try {
      // Check if any field is empty
      if (!accountName || !accountNumber || !accountType || !accountBalance) {
        window.alert("Please fill in all required fields.");
        return;
      }

      // Reference to the accounts collection for the current user
      const accountsCollectionRef = collection(db, "users", userId, "accounts");
      const accountData = {
        accountName,
        accountNumber,
        accountType,
        accountBalance,
      };

      // Add the new account document to Firestore
      await setDoc(doc(accountsCollectionRef, accountName), accountData);
      handleClose();
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  // Function to handle editing an account
  const handleEditModal = (account) => {
    if (account) {
      // Set mode to edit
      setMode("edit");
      // Set form fields to the values of the account being edited
      setAccountName(account.accountName);
      setAccountNumber(account.accountNumber);
      setAccountType(account.accountType);
      setAccountBalance(account.accountBalance);
      setEditAccount(account);
      // Show the modal
      handleShow();
    } else {
      console.error("Error: No account provided for editing");
    }
  };

  // Function to update an existing account
  const handleUpdateAccount = async (editAccount) => {
    try {
      // Check if any field is empty
      if (!accountName || !accountNumber || !accountType || !accountBalance) {
        window.alert("Please fill in all required fields.");
        return;
      }

      // Reference to the accounts collection for the current user
      const accountsCollectionRef = collection(db, "users", userId, "accounts");
      const accountData = {
        accountName,
        accountNumber,
        accountType,
        accountBalance,
      };

      // Update the account document in Firestore
      const accountDocRef = doc(accountsCollectionRef, editAccount.id);
      await updateDoc(accountDocRef, accountData);
      handleClose();
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  // Function to delete an account
  const handleDeleteAccount = async (accountId) => {
    try {
      // Reference to the accounts collection for the current user
      const accountsCollectionRef = collection(db, "users", userId, "accounts");
      const accountDocRef = doc(accountsCollectionRef, accountId);

      // Delete the account document from Firestore
      await deleteDoc(accountDocRef);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  // Effect hook to fetch user accounts from Firestore
  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        collection(db, "users", userId, "accounts"),
        (querySnapshot) => {
          // Convert query snapshot to array of account objects
          const fetchedAccounts = [];
          querySnapshot.forEach((doc) => {
            fetchedAccounts.push({ id: doc.id, ...doc.data() });
          });
          // Update accounts state with fetched accounts
          setAccounts(fetchedAccounts);
        }
      );
      // Unsubscribe from snapshot listener when component unmounts
      return unsubscribe;
    }
  }, [userId]);

  return (
    <>
      {/* Button to open the modal for adding a new account */}
      <Button
        className="me-2 mb-2"
        onClick={() => {
          handleShow();
          setMode("add");
        }}
      >
        Add Account
      </Button>

      {/* Modal for adding/editing an account */}
      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          {/* Modal title */}
          <Modal.Title>
            {mode === "edit" ? "Edit Account" : "Add Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for adding/editing an account */}
          <form>
            <div className="mb-3">
              <label htmlFor="accountName" className="form-label">
                Account Name :
              </label>
              <input
                type="text"
                className="form-control"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                id="accountName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accountNumber" className="form-label">
                Account Number :
              </label>
              <input
                type="number"
                className="form-control"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                id="accountNumber"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accountType" className="form-label">
                Account Type :
              </label>
              <select
                className="form-select"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                id="accountType"
              >
                {/* Dropdown options for account types */}
                <option value="cheque">Cheque Account</option>
                <option value="savings">Savings Account</option>
                <option value="credit">Credit Card</option>
                <option value="loan">Loan Account</option>
                <option value="cash">Cash</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="accountBalance" className="form-label">
                Account Balance :
              </label>
              <input
                type="number"
                className="form-control"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
                id="accountBalance"
              />
            </div>
            {/* Button to add/update account */}
            <button
              type="button"
              onClick={() => {
                if (mode === "edit") {
                  handleUpdateAccount(editAccount);
                } else {
                  handleAddAccount();
                }
              }}
              className="btn btn-primary"
            >
              {mode === "edit" ? "Update Account" : "Add Account"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Display user accounts in a table */}
      {Object.entries(
        // Group accounts by account type
        accounts.reduce((acc, account) => {
          if (!acc[account.accountType]) {
            acc[account.accountType] = [];
          }
          acc[account.accountType].push(account);
          return acc;
        }, {})
      ).map(([accountType, accountsGroup]) => (
        <div key={accountType}>
          {/* Display account type as heading */}
          <h3>{accountType.toUpperCase()}</h3>
          {/* Table to display accounts of current type */}
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Account Balance</th>
              </tr>
            </thead>
            <tbody>
              {/* Iterate over accounts in the current group */}
              {accountsGroup.map((account) => (
                <tr key={account.id}>
                  <td>{account.accountName}</td>
                  <td>{account.accountBalance}</td>
                  {/* Buttons to edit/delete account */}
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditModal(account)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </>
  );
}

export default UserAccountModal; // Export the UserAccountModal component
