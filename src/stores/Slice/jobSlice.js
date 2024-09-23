import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchAll",
  async ({ city, niche, searchKeyword = "" }) => {
    try {
      let link = "/job/get-all-jobs?";
      const queryParams = [];

      if (searchKeyword) queryParams.push(`searchKeyword=${searchKeyword}`);
      if (city) queryParams.push(`city=${city}`);
      if (niche) queryParams.push(`niche=${niche}`);

      link += queryParams.join("&");
      const response = await axiosInstance.get(link);

      toast.success("Jobs fetched successfully!");
      return response.data.data.jobs;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching jobs");
      throw error; 
    }
  }
);

export const fetchSingleJob = createAsyncThunk(
  "jobs/fetchSingle",
  async (jobId) => {
    try {
      const response = await axiosInstance.get(`/job/get/${jobId}`);
      toast.success("Single job fetched successfully!");
      return response.data.job;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching job");
      throw error; 
    }
  }
);

export const postJob = createAsyncThunk(
  "jobs/post",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/job/post-job`, data, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Job posted successfully!");
      return response.data.message;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error posting job");
      throw error; 
    }
  }
);

export const getMyJobs = createAsyncThunk(
  "jobs/getMyJobs",
  async () => {
    try {
      const response = await axiosInstance.get(`/job/getmyjobs`);

      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching my jobs");
      throw error; 
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`/job/delete/${id}`);
      toast.success("Job deleted successfully!");
      return response.data.message;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting job");
      throw error; 
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    clearAllJobErrors(state) {
      state.error = null;
    },
    resetJobSlice(state) {
      state.error = null;
      state.jobs = [];
      state.loading = false;
      state.message = null;
      state.myJobs = [];
      state.singleJob = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch jobs"; // Provide generic error message
      })

      .addCase(fetchSingleJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.singleJob = action.payload;
      })
      .addCase(fetchSingleJob.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch job";
      })

      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(postJob.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to post job";
      })

      .addCase(getMyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.myJobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch my jobs";
      })

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteJob.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete job";
      });
  },
});

export const { clearAllJobErrors, resetJobSlice } = jobSlice.actions;

export default jobSlice.reducer;
