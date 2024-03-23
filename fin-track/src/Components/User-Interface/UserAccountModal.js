import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/UserContext";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function UserAccountModal() {
  const [show, setShow] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("cheque");
  const [accountBalance, setAccountBalance] = useState("");
  const [accounts, setAccounts] = useState([]);

  const [editAccount, setEditAccount] = useState(null);

  const [mode, setMode] = useState("add");
  const { userId } = useUserId();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    clearForm();
  };

  const clearForm = () => {
    setAccountName("");
    setAccountNumber("");
    setAccountType("cheque");
    setAccountBalance("");
  };

  const handleAddAccount = async () => {
    try {
      const accountsCollectionRef = collection(db, "users", userId, "accounts");
      const accountData = {
        accountName,
        accountNumber,
        accountType,
        accountBalance,
      };
      await setDoc(doc(accountsCollectionRef, accountName), accountData);
      handleClose();
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  const handleEditModal = (account) => {
    if (account) {
      console.log("Edit button clicked");
      console.log("Account ID:", account.id);
      console.log("Account Name:", account.accountName);
      console.log("Account Number:", account.accountNumber);
      console.log("Account Type:", account.accountType);
      console.log("Account Balance:", account.accountBalance);

      setMode("edit");

      setAccountName(account.accountName);
      setAccountNumber(account.accountNumber);
      setAccountType(account.accountType);
      setAccountBalance(account.accountBalance);
      setEditAccount(account);
      handleShow();
    } else {
      console.error("Error: No account provided for editing");
    }
  };

  useEffect(() => {
    console.log("Mode: ", mode);
  }, [mode]);

  const handleUpdateAccount = async (editAccount) => {
    try {
      const accountsCollectionRef = collection(db, "users", userId, "accounts");
      const accountData = {
        accountName,
        accountNumber,
        accountType,
        accountBalance,
      };
      const accountDocRef = doc(accountsCollectionRef, editAccount.id);
      await updateDoc(accountDocRef, accountData);
      handleClose();
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      const accountsCollectionRef = collection(db, "users", userId, "accounts");
      const accountDocRef = doc(accountsCollectionRef, accountId);
      await deleteDoc(accountDocRef);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        collection(db, "users", userId, "accounts"),
        (querySnapshot) => {
          const fetchedAccounts = [];
          querySnapshot.forEach((doc) => {
            fetchedAccounts.push({ id: doc.id, ...doc.data() });
          });
          setAccounts(fetchedAccounts);
        }
      );
      return unsubscribe;
    }
  }, [userId]);

  return (
    <>
      <Button
        className="me-2 mb-2"
        onClick={() => {
          handleShow();
          setMode("add");
        }}
      >
        Add Account
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "edit" ? "Edit Account" : "Add Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <button
              type="button"
              onClick={() => {
                console.log("Current mode:", mode);
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
              
      
      {Object.entries(
        accounts.reduce((acc, account) => {
          if (!acc[account.accountType]) {
            acc[account.accountType] = [];
          }
          acc[account.accountType].push(account);
          return acc;
        }, {})
      ).map(([accountType, accountsGroup]) => (
        <div key={accountType}>
          <h3>{accountType.toUpperCase()}</h3>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Account Balance</th>
              </tr>
            </thead>
            <tbody>
              {accountsGroup.map((account) => (
                <tr key={account.id}>
                  <td>{account.accountName}</td>
                  <td>{account.accountBalance}</td>
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

export default UserAccountModal;
