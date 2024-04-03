import React, { useState, useEffect } from "react";
import { useUserId } from "../Firebase/UserContext";
import { db } from "../Firebase/Firebase"; // Import storage from Firebase
import { storage } from "../Firebase/Firebase";
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
import { Tabs, Tab, FloatingLabel, Form, Button, Table } from "react-bootstrap";
import ImageModal from "./ImageModal";

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
  const [hoveredImageUrl, setHoveredImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleFormSubmit = async (event, transactionType) => {

 

    event.preventDefault();

    // Check if required fields are filled
    if (!date || !account || !category || !amount) {
      window.alert("Please fill in all required fields.");
      return; // Exit early if any required field is missing
    }

    try {
      let imageUrl = null; // Initialize imageUrl to null

      // Check if an image is selected before attempting to upload
      if (image) {
        const imageRef = ref(
          storage,
          `${userId}/${accountId}/${Date.now()}_${image.name}`
        );
        await uploadBytes(imageRef, image);

        // Get the download URL of the uploaded image
        imageUrl = await getDownloadURL(imageRef);
      }

      const selectedAccount = accountData.find((acc) => acc.id === accountId);
      const currentBalance = parseFloat(selectedAccount.accountBalance);
      const newBalance = currentBalance + newAmount;
  
      // Update the balance field of the account document in Firestore

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
        amount: newAmount.toString(),
        description,
        imageUrl, // Use imageUrl as the value for imageUrl in the transaction document
      });

      setDate("");
      setAccount("");
      setCategory("");
      setAmount("");
      setDescription("");
      setImage(null);

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const unsubscribeFunctions = []; // Define unsubscribeFunctions array

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
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };


  }, [userId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  // Function to fetch image URL from Firebase Storage
  const fetchImageUrl = async (imageUrl) => {
    try {
      // Check if imageUrl is not null before fetching
      if (imageUrl) {
        const url = await getDownloadURL(ref(storage, imageUrl));
        setHoveredImageUrl(url);
        setIsModalOpen(true); // Open the modal when image URL is fetched
      } else {
        console.error("Image URL is null.");
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };
  

  // Event handler for double click
  const handleDoubleClick = (imageUrl) => {
    fetchImageUrl(imageUrl);
  };

  // Event handler for closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  <Button className="submitButton" variant="primary" type="submit">
    Add Income ....
  </Button>
</div>

          </Form>
        
          </div>
        </Tab>

        <Tab eventKey="statement" title="Statement">
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
                      <td
                        onDoubleClick={() =>
                          handleDoubleClick(transaction.imageUrl)
                        }
                        style={{ cursor: "pointer" }} // Set cursor to pointer to indicate clickability
                      >
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Render the modal */}
              {isModalOpen && (
                <ImageModal
                  imageUrl={hoveredImageUrl}
                  onClose={handleCloseModal}
                />
              )}
            </div>
          ))}
        </Tab>


        <Tab eventKey="expense" title="Expense">
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
