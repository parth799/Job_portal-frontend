import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice.js";

const store = configureStore({
    reducer: {
       user: userReducer,  
    }
});

export default store;
