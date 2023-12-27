"use client"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const postProduct = createAsyncThunk(
  'products/postProduct', 
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/api/createProduct', formData ,{
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
     } });
     console.log(response.data + "redux");
      return response.data;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getProduct = createAsyncThunk(
    'products/getProduct', 
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('http://localhost:8000/api/getProduct' ,{
          withCredentials: true });
        return response.data;  
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const getSingleProduct = createAsyncThunk(
    'products/getSingleProduct', 
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getSingleProduct/${id}` ,{
          withCredentials: true });
        return response.data;  
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  

  export const deleteProduct = createAsyncThunk(
    'products/deleteProduct', 
    async (id, thunkAPI) => {
      try {
        const response = await axios.delete(`http://localhost:8000/api/deleteProduct/${id}` ,{
          withCredentials: true });
        return response.data;  
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );


  export const editProduct = createAsyncThunk(
    'products/editProduct', 
    async ({id, formData}, thunkAPI) => {
      try {
        const response = await axios.patch(`http://localhost:8000/api/updateProduct/${id}`, formData ,{
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', 
       } });
       console.log(response.data + "redux");
        return response.data;  
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  

  export const productsSlice = createSlice({
    name: 'products',
    initialState: {
      items: [],
      item:  null,
      status: 'idle' ,// idle | loading | succeeded | failed,
      totalStoreValue: 0,
      
    },reducers:{
      CALC_TOTAL_VALUE(state, action) {
        const products = action.payload;
      console.log(action.payload);
        const array = [];
      
        products.map((item) => {
          const { price, quantity } = item;
          let q = Number(quantity)
          const productValue = price * q ;
      
          return array.push(productValue);
        });
      
        const totalValue = array.reduce((a, b) => {
          return a + b;
        }, 0);
      
        state.totalStoreValue = totalValue;
      },

    }, 
    extraReducers: {
      [getProduct.pending]: (state) => {
        state.status = 'loading';
      },
      [getProduct.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      },
      [getProduct.rejected]: (state) => {
        state.status = 'failed';
      },
      [getSingleProduct.fulfilled]:(state, action)=>{
        state.item = action.payload;
        console.log(action.payload);
      }
      
    }
  })

  export const {CALC_TOTAL_VALUE} = productsSlice.actions
  export const selectAllProducts = state => state.products.items;
  export const selectProduct = state => state.products.item;
  export const getProductStatus = state => state.products.status
  export const selectTotalPrice = state => state.products.totalStoreValue;

  

  