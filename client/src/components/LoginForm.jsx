import React from 'react'
import authStore from '../stores/authStore'

const LoginForm = () => {
  const store = authStore();

  return (
    <div className='m-5'>
      <form onSubmit={store.login} action="" className='flex flex-col gap-4'>
        <input
          onChange={store.updateLoginForm}
          value={store.loginForm.email}
          type="email"
          name='email'
          className='p-5' />
        <input
          onChange={store.updateLoginForm}
          value={store.loginForm.password}
          type="password"
          name='password'
          className='p-5' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm