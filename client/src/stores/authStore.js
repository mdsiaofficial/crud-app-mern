import axios from 'axios';
import { create } from 'zustand';



const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: ""
  },

  signupForm: {
    email: "",
    password: ""
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => (
      {
        loginForm: {
          ...state.loginForm,
          [name]: value
        }
      }
    ))
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;
    set((state) => (
      {
        signupForm: {
          ...state.signupForm,
          [name]: value
        }
      }
    ))
  },

  login: async (e) => {

    const { loginForm } = authStore.getState();
    const res = await axios.post("/login", loginForm, { withCredentials: true });
    set({
      loggedIn: true,
      loginForm: {
        email: "",
        password: "",
      }
    });
    
    console.log(res);
  },

  signup: async (e) => {
    const { signupForm } = authStore.getState();
    console.log(`signup`);
    const res = await axios.post("/signup", signupForm, { withCredentials: true });

    set({
      signupForm: {
        email: "",
        password: "",
      }
    });
    console.log(res);

  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth", { withCredentials: true });
      set({ loggedIn: true });

    } catch (error) {
      console.error('error: ', error);
      set({ loggedIn: false });
    }
  },

  logout: async () => {
    await axios.get("/logout", { withCredentials: true });
    set({ loggedIn: false });

  }

}));
export default authStore;