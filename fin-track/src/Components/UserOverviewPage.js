import React from 'react'
import { useAuth } from './Firebase/AuthContext'
import UserNavbar from './userNavbar'

function UserOverviewPage() {
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
    </div>
  )
}

export default UserOverviewPage