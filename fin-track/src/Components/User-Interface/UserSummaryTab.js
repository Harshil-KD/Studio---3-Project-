import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/UserContext"; // Importing custom hook to get user ID
import { db, storage } from "../Firebase/Firebase"; // Importing Firestore database and storage instances
import {
  getDocs,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore"; // Importing Firestore functions
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Importing storage functions
import { Tabs, Tab, FloatingLabel, Form, Button, Table } from "react-bootstrap"; // Importing Bootstrap components

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

  const { userId } = useUserId(); // Using custom hook to get user ID

  // Function to generate a random alphanumeric string of given length
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

  // Fetch user accounts from Firestore
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userDocRef = doc(db, "users", userId); // Reference to the user document
        const accountsCollectionRef = collection(userDocRef, "accounts"); // Reference to the accounts subcollection
        const snapshot = await getDocs(accountsCollectionRef); // Get all documents from the accounts subcollection

        const accountsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched accounts data:", accountsData); // Log fetched accounts data
        setAccountData(accountsData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    if (userId) {
      fetchAccounts();
    }
  }, [userId]);

  // Function to handle form submission
  const handleFormSubmit = async (event, type) => {
    event.preventDefault();
    try {
      // Upload image to storage
      const imageRef = ref(
        storage,
        `${userId}/${accountId}/${Date.now()}_${image.name}`
      );
      await uploadBytes(imageRef, image);

      // Get image URL
      const imageUrl = await getDownloadURL(imageRef);

      // Adjust amount for expenses
      let newAmount = parseFloat(amount);
      if (type === "expense") {
        newAmount *= -1; // Make the amount negative for expenses
      }
  
      // Update account balance
      const selectedAccount = accountData.find((acc) => acc.id === accountId);
      const currentBalance = parseFloat(selectedAccount.accountBalance);
      const newBalance =
        type === "income"
          ? currentBalance + parseFloat(amount)
          : currentBalance - parseFloat(amount);

      const accountDocRef = doc(db, "users", userId, "accounts", accountId);
      await updateDoc(accountDocRef, { accountBalance: newBalance });

      // Add transaction document
      const transactionId = generateId(10);
      const accountsRef = doc(db, "users", userId, "accounts", accountId);
      const transactionsCollectionRef = collection(accountsRef, "transactions");
      await setDoc(doc(transactionsCollectionRef, transactionId), {
        userId,
        date,
        account,
        category,
        amount,
        description,
        imageUrl,
      });

      // Clear form fields
      setDate("");
      setAccount("");
      setCategory("");
      setAmount("");
      setDescription("");
      setImage(null);

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Fetch transactions data from Firestore
  useEffect(() => {
    const unsubscribeFunctions = []; // Array to store unsubscribe functions

    const fetchData = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(db, "users", userId);
        const accountsCollectionRef = collection(userDocRef, "accounts");
        const accountsSnapshot = await getDocs(accountsCollectionRef);

        const transactionsData = {};

        accountsSnapshot.forEach((accountDoc) => {
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
                accountId: accountDoc.id,
              };

              const date = transaction.date;

              if (!transactionsData[date]) {
                transactionsData[date] = [];
              }

              transactionsData[date].push(transaction);
            });

            setTransactionsData(transactionsData);
          });

          unsubscribeFunctions.push(unsubscribe);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to unsubscribe from snapshot listeners
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [userId]);

  // Function to handle image selection
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
        {/* Income Tab */}
        <Tab eventKey="income" title="Income">
          {/* Form for adding income */}
          <Form onSubmit={(event) => handleFormSubmit(event, "income")}>
            {/* Date input */}
            <FloatingLabel controlId="date" label="Date">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FloatingLabel>
            {/* Account selection */}
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
                {/* Map through accountData to generate options */}
                {!loading &&
                  accountData.map((acc) => (
                    <option key={acc.accountNumber} value={acc.id}>
                      {acc.accountName}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>
            {/* Category input */}
            <FloatingLabel controlId="category" label="Category">
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FloatingLabel>
            {/* Amount input */}
            <FloatingLabel controlId="amount" label="Amount">
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FloatingLabel>
            {/* Description input */}
            <FloatingLabel controlId="description" label="Description">
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            {/* Image upload */}
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            {/* Submit button */}
            <Button variant="primary" type="submit">
              Add Income ....
            </Button>
          </Form>
        </Tab>

        {/* Statement Tab */}
        <Tab eventKey="statement" title="Statement">
          {/* Display transactions */}
          {Object.keys(transactionsData).map((date) => (
            <div key={date}>
              <h4>Date: {date}</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData[date].map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.accountName}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </Tab>

        {/* Expense Tab */}
        <Tab eventKey="expense" title="Expense">
          {/* Form for adding expenses */}
          <Form onSubmit={(event) => handleFormSubmit(event, "expense")}>
            {/* Date input */}
            <FloatingLabel controlId="date" label="Date">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FloatingLabel>
            {/* Account selection */}
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
                {/* Map through accountData to generate options */}
                {!loading &&
                  accountData.map((acc) => (
                    <option key={acc.accountNumber} value={acc.id}>
                      {acc.accountName}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>
            {/* Category input */}
            <FloatingLabel controlId="category" label="Category">
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FloatingLabel>
            {/* Amount input */}
            <FloatingLabel controlId="amount" label="Amount">
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FloatingLabel>
            {/* Description input */}
            <FloatingLabel controlId="description" label="Description">
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            {/* Image upload */}
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            {/* Submit button */}
            <Button variant="primary" type="submit">
              Add Expense ....
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </>
  );
}

export default UserSummaryTab;
