// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";

// Async thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Async thunk for user registration
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      // //console.log(data);
      const response = await api.post("/signup", data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = [];
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // .addCase(register.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(register.fulfilled, (state, action) => {
        // state.loading = false;
        // state.isLoggedIn = true;
        // state.user = action.payload;
        toast.success("Registered successful!");
      })
      .addCase(register.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.payload.message;
        toast.error("Registered failed!");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
