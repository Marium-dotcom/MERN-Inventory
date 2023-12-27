"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filteredProducts: [],
  };
  
  const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_CATEGORY(state, action) 
        {
            const { products, category } = action.payload;
            let tempProducts = [];
            if (category === "All") {
              tempProducts = products;
            } else {
              tempProducts = products.filter(
                (product) => product.category === category
              );
            }
            state.filteredProducts = tempProducts;

          }
          ,    FILTER_BY_SEARCH(state, action) {

            const { products, search } = action.payload;
            let tempProducts = products.filter(
              (product) =>
                product.name.includes(search) ||
                product.category.includes(search)
            );
      
            state.filteredProducts = tempProducts;
          },
          },
      

        
  });
  export const {  FILTER_BY_CATEGORY, FILTER_BY_SEARCH } = filterSlice.actions;
  export const selectFilteredPoducts = (state) => state.filter.filteredProducts;
  export default filterSlice.reducer;