import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import { productsSlice } from "./Slices/productSlice";
import filterSlice from "./Slices/filterSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        products: productsSlice.reducer,
        filter: filterSlice,

    }
})

export default store