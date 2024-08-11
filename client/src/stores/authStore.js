import axios from 'axios';
import { create } from 'zustand';



const authStore = create((set) => ({
  loginForm: {
    email: "",
    password: ""
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state)=>(
      {
        loginForm: {
          ...state.loginForm,
          [name]: value
        }
      }
    ))
  },

  login: (e) => {
    e.preventDefault();
    const { loginForm } = authStore.getState();
    axios.post("/login", loginForm, {withCredentials:true})
  }



}));
export default authStore;