
import './App.css'
import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';

function App() {

  return (
    <>
      <BrowserRouter>

        <div className='m-5'>
          <h1 className='m-5'>Hi Crud</h1>
          <ul className='flex items-center justify-center gap-5 ring-1 p-4'>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/login`}>Login</Link>
            </li>
            <li>
              <Link to={`/signup`}>Sign Up</Link>
            </li>
            <li>
              <Link to={`/logout`}>Logout</Link>
            </li>
          </ul>
        </div>


        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <NotesPage />
              </RequireAuth>
            }
          />

          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/signup'
            element={<SignupPage />}
          />
          <Route
            path='/logout'
            element={<LogoutPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
