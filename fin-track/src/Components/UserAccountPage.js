import React from 'react';

import UserNavbar from './userNavbar'; // Importing user navbar component
import UserAccountModal from './User-Interface/UserAccountModal'; // Importing user account modal component
import "../CSS/UserAccountPage.css"; // Importing CSS file for user account page styling


function UserAccountPage() {
  return (
    <div>
      {/* Render user navbar */}
      <UserNavbar />
      {/* Render user account modal */}
      <UserAccountModal />
    </div>
  );
}

export default UserAccountPage;
