import React from 'react';
import { useAuth } from './Firebase/AuthContext';
// import { Link } from 'react-router-dom';
import UserNavbar from './userNavbar';
import UserSummaryTab from './User-Interface/UserSummaryTab';

function UserSummaryPage() {
  const { currentUser, isAuthenticated } = useAuth();

  if(isAuthenticated) {
    console.log(currentUser.displayName)
  }
  else{
    console.log("No user logged in")
  }
  
  return (
    <div>
      <UserNavbar />
      <UserSummaryTab />
    </div>
  )
}

export default UserSummaryPage