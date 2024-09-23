import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";

export const updateProfile = createAsyncThunk(
  "updateProfile/updateProfile",
  async (data, ) => {
    try {
      const response = await axiosInstance.put(
        "/user/update/profile",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Profile updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
      console.log(error);
      
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updateProfile/updatePassword",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        "/user/update/password",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Password updated successfully");
      
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password.");
      console.log(error);
      
    }
  }
);

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    profileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload;
      });

    // Update password
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload;
      });
  },
});

export const { profileResetAfterUpdate } = updateProfileSlice.actions;

export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;
