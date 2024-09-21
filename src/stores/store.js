import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice.js";
import jobReducer from "./Slice/jobSlice.js";

const store = configureStore({
    reducer: {
       user: userReducer,  
       jobs: jobReducer
    }
});

export default store;
