import React from 'react';
// import { Link } from 'react-router-dom';
import UserNavbar from './userNavbar';
import UserSummaryTab from './User-Interface/UserSummaryTab';

function UserSummaryPage() {
  
  return (
    <div>
      <UserNavbar />  {/* Render the user navigation bar */}
      <UserSummaryTab />   {/* Render the user summary tab */}
    </div>
  )
}

export default UserSummaryPage;