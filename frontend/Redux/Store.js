import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";

const store = configureStore({
    reducer:{
        Auth: authSlice,
    }
})

export default store