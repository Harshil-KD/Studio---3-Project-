import React, { createContext, useContext, useEffect, useState } from "react";
import {auth} from "./Firebase"; // Importing the authentication object from Firebase
import { onAuthStateChanged } from "firebase/auth";

// Creating a new context to manage authentication state
const AuthContext = createContext();

// Custom hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component to wrap the application and manage authentication state
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Current user state
  const [userLoggedIn, setUserLoggedIn] = useState(false); // User login status
  const [loading, setLoading] = useState(true);

    // Effect hook to run once on component mount
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, initializeUser);
    return unSubscribe;
  }, []);

    // Function to initialize user based on authentication state
  async function initializeUser(user) {
    if (user) {
      console.log("User logged in:", user);
      setCurrentUser({ ...user });  // Set current user
      setUserLoggedIn(true);
    } else {
      console.log("No user logged in");
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);  // Set loading state to false
  }

  const value = {
    currentUser,
    isAuthenticated: userLoggedIn, // Renamed to isAuthenticated
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
