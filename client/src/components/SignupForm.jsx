import React from 'react'
import authStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
  const store = authStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await store.signup();
    navigate("/login");
  }
  return (
    <div className='m-5'>
      <form onSubmit={handleSignup} action="" className='flex flex-col gap-4'>
        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.email}
          type="email"
          name='email'
          placeholder='Email'
          className='p-5' />
        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.password}
          type="password"
          name='password'
          placeholder='Password'
          className='p-5' />
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default SignupForm