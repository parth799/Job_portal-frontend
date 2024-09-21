import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

export const register = createAsyncThunk(
  "user/register",
  async (data) => {
    try {
      const response = await axiosInstance.post("/user/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Registration successful!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Registration failed!");
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data) => {
    try {
      const response = await axios.post("http://localhost:2000/api/v1/user/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("response.data.data", response);

      const { user, token } = response.data.data;
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      return user;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed!");
      throw error;
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async () => {
    try {
      const response = await axiosInstance.get("/user/getuser");
      console.log("response", response);

      return response.data.user;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch user details!");
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async () => {
    try {
      await axiosInstance.get("/user/logout");
      toast.success("Logout successful!");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Logout failed!");
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    clearAllErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });

    // Handle logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearAllErrors } = userSlice.actions;
export default userSlice.reducer;
