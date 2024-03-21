// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAck01ZEXHC0PHO-uejKy8AZqIz7wVviC8",
  authDomain: "fintrack-otago.firebaseapp.com",
  projectId: "fintrack-otago",
  storageBucket: "fintrack-otago.appspot.com",
  messagingSenderId: "739754835687",
  appId: "1:739754835687:web:b00d29b02b141f44b0ec42",
  measurementId: "G-T75JMZKLDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth after initializing the app
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
