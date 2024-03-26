import React from "react";
import { useAuth } from "./Firebase/AuthContext";

function AdminPage() {
  const { currentUser, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    console.log(currentUser.displayName);
  } else {
    console.log("No user logged in");
  }
  
  return (
    <div>
      <p>This is a admin Page.</p>
    </div>
  );
}

export default AdminPage;
