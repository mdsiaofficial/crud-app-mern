import React, { useEffect } from 'react'
import authStore from '../stores/authStore'

const LogoutPage = () => {

  const store = authStore();
  useEffect(() => {
    store.logout();
  }, []);
  
  return (
    <div>You are logged out.</div>
  )
}

export default LogoutPage