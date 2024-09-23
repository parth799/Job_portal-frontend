import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosInstance";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchAll",
  async ({ city, niche, searchKeyword = "" }, { rejectWithValue }) => {
    try {
      let link = "/job/get-all-jobs";
      const queryParams = [];

      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);
      }
      if (city) {
        queryParams.push(`city=${city}`);
      }
      if (niche) {
        queryParams.push(`niche=${niche}`);
      }

      link += queryParams.join("&");
      const response = await axiosInstance.get(link);

      return response.data.data.jobs;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchSingleJob = createAsyncThunk(
  "jobs/fetchSingle",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/job/get/${jobId}`);
      return response.data.job;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const postJob = createAsyncThunk(
  "jobs/post",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/job/post-job`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getMyJobs = createAsyncThunk(
  "jobs/getMyJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/job/getmyjobs`);
      return response.data.myJobs;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/job/delete/${id}`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
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
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.singleJob = action.payload;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.myJobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllJobErrors, resetJobSlice } = jobSlice.actions;

export default jobSlice.reducer;
