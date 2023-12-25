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
  

  export const productsSlice = createSlice({
    name: 'products',
    initialState: {
      items: [],
      status: 'idle' ,// idle | loading | succeeded | failed
      
      
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
      }
    }
  })


  export const selectAllProducts = state => state.products.items;
export const getProductStatus = state => state.products.status