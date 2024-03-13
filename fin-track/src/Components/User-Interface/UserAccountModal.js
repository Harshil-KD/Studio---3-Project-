import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UserAccountModal.css";
// import Table from "react-bootstrap/Table";

function UserAccountModal() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="AccountType" className="form-label">
                Account Type :
              </label>
              <select id="accountType" name="accountType">
                <option value="cheque">Cheque Account</option>
                <option value="savings">Savings Account</option>
                <option value="credit">Credit Card</option>
                <option value="loan">Loan Account</option>
                <option value="cash">Cash</option>
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
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Account..
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* <Table responsive='sm'>
      <thead>
        <tr>
          <th>Account Name</th>
          <th>Account Number</th>
          <th>Account Type</th>
          <th>Account Balance</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
      </Table> */}
      {/* {accounts.map((account) => (
        <div key={account.accountType}>
          <h3>{account.accountType}</h3>
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
      ))} */}
    </>
  );
}

export default UserAccountModal;
