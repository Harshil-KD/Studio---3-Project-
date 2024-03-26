import React from 'react';
import { useAuth } from './Firebase/AuthContext';

import UserNavbar from './userNavbar';
import UserAccountModal from './User-Interface/UserAccountModal';

function UserAccountPage() {
  const { currentUser, isAuthenticated } = useAuth();

  // Log user status
  if (isAuthenticated) {
    console.log("User logged in:", currentUser.displayName);
  } else {
    console.log("No user logged in");
  }

  return (
    <div>
      <UserNavbar />
      <UserAccountModal />
    </div>
  );
}

export default UserAccountPage;
