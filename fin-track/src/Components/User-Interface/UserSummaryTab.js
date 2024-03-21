import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/userContext";
import { db } from "../Firebase/firebase"; // Import storage from Firebase
import { storage } from "../Firebase/firebase";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Import necessary storage functions
import { Tabs, Tab, FloatingLabel, Form, Button, Table } from "react-bootstrap";

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

  const { userId } = useUserId();

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
        console.log("Fetched accounts data:", accountsData); // Added console log
        setAccountData(accountsData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false); // Moved setLoading inside the try block
      }
    };

    if (userId) {
      fetchAccounts();
    }
  }, [userId]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(accountId);
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(
        storage,
        `${userId}/${accountId}/${Date.now()}_${image.name}`
      );
      await uploadBytes(imageRef, image);
      console.log("Image uploaded successfully:", imageRef.fullPath); // Added console log

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Calculate the new balance
      const selectedAccount = accountData.find((acc) => acc.id === accountId);
      const currentBalance = parseFloat(selectedAccount.accountBalance);
      const newBalance = currentBalance + parseFloat(amount);

      // Update the balance field of the account document in Firestore
      const accountDocRef = doc(db, "users", userId, "accounts", accountId);
      await updateDoc(accountDocRef, { accountBalance: newBalance });

      const transactionId = generateId(10);

      // Store the form data and image URL in Firestore
      const accountsRef = doc(db, "users", userId, "accounts", accountId); // Reference to the user's account document
      const transactionsCollectionRef = collection(accountsRef, "transactions"); // Reference to the transactions subcollection
      await setDoc(doc(transactionsCollectionRef, transactionId), {
        userId,
        date,
        account,
        category,
        amount,
        description,
        imageUrl, // Add the imageUrl to the Firestore document
      });
      console.log("Form data stored in Firestore successfully!"); // Added console log

      // Clear the form fields after successful submission
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

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        const accountsCollectionRef = collection(userDocRef, "accounts");
        const accountsSnapshot = await getDocs(accountsCollectionRef);

        const allTransactions = [];

        for (const accountDoc of accountsSnapshot.docs) {
          const transactionsCollectionRef = collection(
            accountDoc.ref,
            "transactions"
          );

          const transactionsQuery = query(
            transactionsCollectionRef,
            orderBy("date", "desc") // Sort transactions by date in descending order
          );

          const transactionsSnapshot = await getDocs(transactionsQuery);

          const transactionsData = transactionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            accountName: accountDoc.data().accountName,
          }));

          allTransactions.push(...transactionsData);
        }

        // Group transactions by date
        const groupedTransactions = allTransactions.reduce(
          (acc, transaction) => {
            const date = transaction.date;
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
          },
          {}
        );

        setTransactionsData(groupedTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        const accountsCollectionRef = collection(userDocRef, "accounts");
        const accountsSnapshot = await getDocs(accountsCollectionRef);

        const allTransactions = [];

        for (const accountDoc of accountsSnapshot.docs) {
          const transactionsCollectionRef = collection(
            accountDoc.ref,
            "transactions"
          );

          const transactionsQuery = query(
            transactionsCollectionRef,
            orderBy("date", "desc") // Sort transactions by date in descending order
          );

          const transactionsSnapshot = await getDocs(transactionsQuery);

          const transactionsData = transactionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            accountName: accountDoc.data().accountName,
          }));

          allTransactions.push(...transactionsData);
        }

        // Group transactions by date
        const groupedTransactions = allTransactions.reduce(
          (acc, transaction) => {
            const date = transaction.date;
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
          },
          {}
        );

        setTransactionsData(groupedTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

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
        <Tab eventKey="income" title="Profit">
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="statement" title="Statement">
        {Object.entries(transactionsData).map(([date, transactions]) => (
          <div key={date}>
            <h3>{date}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
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
        <Tab eventKey="expense" title="Expense">
          Tab content for Expense
        </Tab>
      </Tabs>
    </>
  );
}

export default UserSummaryTab;
