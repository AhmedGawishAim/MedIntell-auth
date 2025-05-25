import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast, Bounce } from "react-toastify";

const isClient = typeof window !== "undefined";

const initialUsers = () => {
  if (!isClient) return [];
  const item = localStorage.getItem("users");
  return item
    ? JSON.parse(item)
    : [
        {
          id: uuidv4(),
          name: "MEDintell",
          email: "MEDintell@gmail.com",
          password: "MEDintell",
        },
      ];
};

const initialIsAuth = () => {
  if (!isClient) return false;
  const item = localStorage.getItem("isAuth");
  return item ? JSON.parse(item) : false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
  },
  reducers: {
    handleRegister: (state, action) => {
      const { name, email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);
      if (user) {
        toast.error("User already exists", {
          autoClose: 1000,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.users.push({ id: uuidv4(), name, email, password });
        if (isClient) {
          localStorage.setItem("users", JSON.stringify(state.users));
        }
        toast.success("User registered successfully", {
          autoClose: 1000,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    handleLogin: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.isAuth = true;
        if (isClient) {
          localStorage.setItem("isAuth", JSON.stringify(true));
        }

        toast.success("User logged in successfully", {
          autoClose: 1000,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.isAuth = false;
        toast.error("Invalid credentials", {
          autoClose: 1500,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    handleForgetPassword: (state, action) => {
      console.log(action.payload);
      
      const { email } = action.payload;
      const user = state.users.find((u) => u.email === email);

      if (user) {
        toast.success(`Password reset instructions sent to ${email}`, {
          autoClose: 2000,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Email not found", {
          autoClose: 2000,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      if (isClient) {
        localStorage.removeItem("isAuth");
      }

      toast.success("User logged out successfully", {
        autoClose: 1000,
        transition: Bounce,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  },
});

export const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleForgetPassword,
} = authSlice.actions;

export default authSlice.reducer;
