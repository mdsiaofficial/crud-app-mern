import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://crud-app-mern-api-black.vercel.app";
// axios.defaults.baseURL = "https://crud-app-mern-api.onrender.com";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
