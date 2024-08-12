import React, { useEffect } from 'react'
import authStore from '../stores/authStore'
import { Navigate } from "react-router-dom";
const RequireAuth = (props) => {
  const store = authStore();
  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, []);


  if (store.loggedIn === null || false) {
    return (
      <div>
        <h1>Please log in to view this page</h1>
        <Navigate to="/login" />
      </div>
    )
  }
  
  
  if (store.loggedIn === true) {
    return (
      <div className="">
        {/* <Navigate to="/" /> */}
        {props.children}
      </div>
    )
  }
}

export default RequireAuth