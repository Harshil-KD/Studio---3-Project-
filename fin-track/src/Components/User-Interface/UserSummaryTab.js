import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/UserContext";
import { db, storage } from "../Firebase/Firebase";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Import necessary storage functions
import ImageModal from "./ImageModal";
import { Tabs, Tab, FloatingLabel, Form, Button, Table } from "react-bootstrap";
import "../User-Interface/Usersummary.css";

function UserSummaryTab() {
  // State variables to store form data
  const [date, setDate] = useState("");
  const [account, setAccount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [accountData, setAccountData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const { userId } = useUserId();

  function generateId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const userDocRef = doc(db, "users", userId);
        const accountsCollectionRef = collection(userDocRef, "accounts");
        const snapshot = await getDocs(accountsCollectionRef);
        const accountsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccountData(accountsData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [userId]);

  const handleFormSubmit = async (event, transactionType) => {
    event.preventDefault();

    let imageUrl = ""; // Default value if no image is uploaded

    try {
      // Proceed with image upload only if an image is selected
      if (image) {
        const imageRef = ref(
          storage,
          `${userId}/${accountId}/${Date.now()}_${image.name}`
        );
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      let transactionAmount = parseFloat(amount);

      // Adjust the balance based on the transaction type
      const selectedAccount = accountData.find((acc) => acc.id === accountId);
      const currentBalance = parseFloat(selectedAccount.accountBalance);
      let newBalance = currentBalance;

      if (transactionType === "income") {
        newBalance += transactionAmount;
      } else if (transactionType === "expense") {
        newBalance -= transactionAmount;
      }

      // Update the account document with the new balance
      const accountDocRef = doc(db, "users", userId, "accounts", accountId);
      await updateDoc(accountDocRef, { accountBalance: newBalance });

      // Create a new transaction with the transactionType field and the imageUrl (empty if no image)
      const transactionId = generateId(10); // Ensure this is a method you've defined for unique IDs
      const transactionsCollectionRef = collection(
        doc(db, "users", userId, "accounts", accountId),
        "transactions"
      );
      await setDoc(doc(transactionsCollectionRef, transactionId), {
        userId,
        date,
        account,
        category,
        amount: transactionAmount,
        description,
        imageUrl, // Will be an empty string if no image was uploaded
        transactionType,
      });

      // Reset form fields after submission
      setDate("");
      setAccount("");
      setAccountId("");
      setCategory("");
      setAmount("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const unsubscribeFunctions = [];
    const fetchData = async () => {
      if (!userId) return;
      try {
        const userDocRef = doc(db, "users", userId);
        const accountsCollectionRef = collection(userDocRef, "accounts");
        const accountsSnapshot = await getDocs(accountsCollectionRef);

        let groupedTransactions = {};

        for (const accountDoc of accountsSnapshot.docs) {
          const transactionsCollectionRef = collection(
            accountDoc.ref,
            "transactions"
          );
          const transactionsQuery = query(
            transactionsCollectionRef,
            orderBy("date", "desc")
          );

          const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
            snapshot.docs.forEach((doc) => {
              const transaction = {
                id: doc.id,
                ...doc.data(),
                accountName: accountDoc.data().accountName,
              };
              const transactionDate = transaction.date;

              if (!groupedTransactions[transactionDate]) {
                groupedTransactions[transactionDate] = [];
              }

              groupedTransactions[transactionDate].push(transaction);
            });

            setTransactionsData({ ...groupedTransactions });
          });

          unsubscribeFunctions.push(unsubscribe);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [userId]);

  const handleAmountDoubleClick = (imageUrl) => {
    setCurrentImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="statement"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="income" title="Income">
          <div className="incomeFormContainer">
            <Form onSubmit={(event) => handleFormSubmit(event, "income")}>
              <FloatingLabel controlId="date" label="Date">
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="account" label="Account">
                <Form.Select
                  aria-label="Select Account"
                  onChange={(e) => {
                    setAccount(e.target.value);
                    setAccountId(e.target.value); // Set the selected account ID
                  }}
                  value={account}
                  disabled={loading} // Disable the dropdown when loading
                >
                  <option value="">Select Account</option>
                  {!loading &&
                    accountData.map((acc) => (
                      <option key={acc.accountNumber} value={acc.id}>
                        {acc.accountName}
                      </option>
                    ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="category" label="Category">
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="amount" label="Amount">
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="description" label="Description">
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <div className="buttonContainer">
                <Button
                  className="submitButton"
                  variant="primary"
                  type="submit"
                >
                  Add Income ....
                </Button>
              </div>
            </Form>
          </div>
        </Tab>

        <Tab eventKey="statement" title="Statement">
          <div className="transactions-container">
            {Object.entries(transactionsData).map(([date, transactions]) => (
              <div key={date} className="table-container">
                <h4>Date: {date}</h4>
                <Table striped bordered hover className="table">
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Category</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={`${date}-${transaction.id}-${index}`}>
                        <td>{transaction.accountName}</td>
                        <td>{transaction.category}</td>
                        <td
                          onDoubleClick={() =>
                            handleAmountDoubleClick(transaction.imageUrl)
                          }
                          style={{
                            color:
                              transaction.transactionType === "expense"
                                ? "red"
                                : "green",
                          }}
                        >
                          {transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))}
          </div>
        </Tab>

        <Tab eventKey="expense" title="Expense">
          <div className="incomeFormContainer">
            <Form onSubmit={(event) => handleFormSubmit(event, "expense")}>
              <FloatingLabel controlId="date" label="Date">
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="account" label="Account">
                <Form.Select
                  aria-label="Select Account"
                  onChange={(e) => {
                    setAccount(e.target.value);
                    setAccountId(e.target.value); // Set the selected account ID
                  }}
                  value={account}
                  disabled={loading} // Disable the dropdown when loading
                >
                  <option value="">Select Account</option>
                  {!loading &&
                    accountData.map((acc) => (
                      <option key={acc.accountNumber} value={acc.id}>
                        {acc.accountName}
                      </option>
                    ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="category" label="Category">
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="amount" label="Amount">
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="description" label="Description">
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <div className="buttonContainer">
                <Button
                  className="submitButton"
                  variant="primary"
                  type="submit"
                >
                  Add Expense ....
                </Button>
              </div>
            </Form>
          </div>
        </Tab>
      </Tabs>

      <ImageModal
        imageUrl={currentImageUrl}
        show={showImageModal}
        onClose={() => setShowImageModal(false)}
      />
    </>
  );
}

export default UserSummaryTab;
