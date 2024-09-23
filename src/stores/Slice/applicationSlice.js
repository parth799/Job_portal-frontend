import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosInstance"; // Assuming axiosInstance is already set up
import { toast } from "react-toastify";

export const fetchEmployerApplications = createAsyncThunk(
    "applications/fetchEmployerApplications",
    async () => {
        try {
            const response = await axiosInstance.get("/application/employer/getall");
            return response.data.data;
        } catch (error) {
            console.log(error);

            throw error;
        }
    }
);

export const fetchJobSeekerApplications = createAsyncThunk(
    "applications/fetchJobSeekerApplications",
    async () => {
        try {
            const response = await axiosInstance.get("/application/jobseeker/getall");
            return response.data.applications;
        } catch (error) {
            console.log(error);
            throw error

        }
    }
);

export const postApplication = createAsyncThunk(
    "applications/postApplication",
    async ({ data, jobId }) => {
        try {
            const response = await axiosInstance.post(`/application/post/${jobId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Application submitted successfully!");
            return response.data.message;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error submitting application.");
            console.log(error);
        }
    }
);

export const deleteApplication = createAsyncThunk(
    "applications/deleteApplication",
    async (id, ) => {
        try {
            const response = await axiosInstance.delete(`/application/delete/${id}`);
            toast.success("Application deleted successfully!");
            return response.data.message;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error deleting application.");
            console.log(error);

        }
    }
);

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        clearAllApplicationErrors(state) {
            state.error = null;
        },
        resetApplicationSlice(state) {
            state.error = null;
            state.applications = [];
            state.message = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployerApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployerApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(fetchEmployerApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(fetchJobSeekerApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobSeekerApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(fetchJobSeekerApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(postApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(postApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(postApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearAllApplicationErrors, resetApplicationSlice } = applicationSlice.actions;
export default applicationSlice.reducer;
