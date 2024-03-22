// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNC8XMm4M3YgcSXNY78tOyq767UztgBoM",
  authDomain: "fbreactprj-a34a6.firebaseapp.com",
  projectId: "fbreactprj-a34a6",
  storageBucket: "fbreactprj-a34a6.appspot.com",
  messagingSenderId: "128712741501",
  appId: "1:128712741501:web:3068fe15f1cfef7d4e5714",
  measurementId: "G-JQJ49BZZK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth after initializing the app
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
