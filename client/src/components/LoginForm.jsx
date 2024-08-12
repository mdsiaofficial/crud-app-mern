import React from 'react'
import authStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const store = authStore();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();
    // nav
    navigate("/");
  }
  return (
    <div className='m-5'>
      <form onSubmit={handleLogin} action="" className='flex flex-col gap-4'>
        <input
          onChange={store.updateLoginForm}
          value={store.loginForm.email}
          type="email"
          name='email'
          placeholder='Email'
          className='p-5' />
        <input
          onChange={store.updateLoginForm}
          value={store.loginForm.password}
          type="password"
          name='password'
          placeholder='Password'
          className='p-5' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm