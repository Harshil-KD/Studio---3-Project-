import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/userContext";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebase";
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
  const { userId } = useUserId();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const accountData = {
    accountName,
    accountNumber,
    accountType,
    accountBalance,
  };

  async function handleAddAccount() {
    try {
      const accountsCollectionRef = collection(db, "users", userId, "accounts");
      const accountDocRef = doc(accountsCollectionRef, accountName);
      await setDoc(accountDocRef, accountData);
      console.log("Account added successfully!");
    } catch (error) {
      console.error("Error adding account:", error);
    }
  }

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
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add Account
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your modal content here */}
          <form>
            <div className="mb-3">
              <label htmlFor="AccountName:" className="form-label">
                Account Name :
              </label>
              <input
                type="text"
                className="form-control"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                id="accountName"
                aria-describedby="accountName"
              />
              {/* <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div> */}
            </div>
            <div className="mb-3">
              <label htmlFor="AccountNumber" className="form-label">
                Account Number :
              </label>
              <input
                type="Number"
                className="form-control"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="AccountType" className="form-label">
                Account Type :
              </label>
              <select
                id="accountType"
                name="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="cheque">Cheque Account</option>
                <option value="savings">Savings Account</option>
                <option value="credit">Credit Card</option>
                <option value="loan">Loan Account</option>
                <option value="cash">Cash</option>
                <option value="cash">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="AccountBalance" className="form-label">
                Account Balance :
              </label>
              <input
                type="number"
                className="form-control"
                id="accountBalance"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onClick={handleAddAccount}
              className="btn btn-primary"
            >
              Add Account..
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* <Table responsive="sm">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table> */}
      {accounts.map((account) => (
        <div key={account.id}>
          <h5>{account.accountType.toUpperCase()}</h5>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Account Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{account.accountName}</td>
                <td>{account.accountBalance}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
    </>
  );
}

export default UserAccountModal;
