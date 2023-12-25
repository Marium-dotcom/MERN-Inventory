import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import { productsSlice } from "./Slices/productSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        products: productsSlice.reducer,

    }
})

export default store