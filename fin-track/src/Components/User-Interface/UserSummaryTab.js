import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/userContext";
import { db } from "../Firebase/firebase";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Tabs, Tab, FloatingLabel, Form, Button, Table } from "react-bootstrap";
import "/OTAGO/YEAR 2 BLOCK 1/reactprojects/Studio---3-Project-Group-3/fin-track/src/CSS/UserSummaryPage.css";

function UserSummaryTab() {
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
        const userDocRef = doc(db, "users", userId);
        const accountsCollectionRef = collection(userDocRef, "accounts");
        const snapshot = await getDocs(accountsCollectionRef);

        const accountsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched accounts data:", accountsData);
        setAccountData(accountsData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAccounts();
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(accountId);
    try {
      const imageRef = ref(
        storage,
        `${userId}/${accountId}/${Date.now()}_${image.name}`
      );
      await uploadBytes(imageRef, image);
      console.log("Image uploaded successfully:", imageRef.fullPath);

      const imageUrl = await getDownloadURL(imageRef);

      const selectedAccount = accountData.find((acc) => acc.id === accountId);
      const currentBalance = parseFloat(selectedAccount.accountBalance);
      const newBalance = currentBalance + parseFloat(amount);

      const accountDocRef = doc(db, "users", userId, "accounts", accountId);
      await updateDoc(accountDocRef, { accountBalance: newBalance });

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
      console.log("Form data stored in Firestore successfully!");

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
            orderBy("date", "desc")
          );

          const transactionsSnapshot = await getDocs(transactionsQuery);

          const transactionsData = transactionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            accountName: accountDoc.data().accountName,
          }));

          allTransactions.push(...transactionsData);
        }

        const groupedTransactions = allTransactions.reduce((acc, transaction) => {
          const date = transaction.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(transaction);
          return acc;
        }, {});

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
    <div className="container">
      <Tabs defaultActiveKey="statement" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="income" title="Profit">
          <Form onSubmit={handleSubmit}>
            {/* Form inputs */}
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
    </div>
  );
}

export default UserSummaryTab;
