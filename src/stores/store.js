import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice.js";
import jobReducer from "./Slice/jobSlice.js";
import updateProfileReducer from "./Slice/updateProfileSlice.js";
import applicationReducer from "./Slice/applicationSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobReducer,
        updateProfile: updateProfileReducer,
        applications: applicationReducer,
    }
});

export default store;
