import React from 'react';

import UserNavbar from './userNavbar';
import UserAccountModal from './User-Interface/UserAccountModal';
import "../CSS/UserAccountPage.css";

function UserAccountPage() {

  return (
    <div>
      <UserNavbar />
      <UserAccountModal />
    </div>
  );
}

export default UserAccountPage;
