import React, { useEffect } from 'react'
import authStore from '../stores/authStore'

const RequireAuth = (props) => {
  const store = authStore();
  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, []);


  if (!store.loggedIn) {
    return (
      <div>
        <h1>Please log in to view this page</h1>
      </div>
    )
  }

  return (
    <div className="">
      {props.children}
    </div>
  )
}

export default RequireAuth