"use client"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import axios from 'axios';



export const getUserData = createAsyncThunk(
    'auth/getUserData', 
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:8000/api/users/getUser', {
              withCredentials: true,
            });
            return res.data
          } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
                }        );


                

export const EditUserData = createAsyncThunk(
    'auth/EditUserData', 
    async (formData, thunkAPI) => {
        try {
            console.log(formData);
            const res = await axios.patch('http://localhost:8000/api/users/updateUser',formData, {
              withCredentials: true,     headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
           }
            });
            console.log(res.data);

            console.log(res);
            return res.data
          } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
                }        );





const initialState = {
    isLoggedIn: false,
    name:  null ,
    user: {
        name:"",
        email:"",
        phone:"",
        bio:"",
        photo:"",
        _id: ""
    }
}

const authSlice = createSlice({


    name:"auth",
    initialState,
    reducers:{

        SET_LOGIN(state,action){
            state.isLoggedIn = action.payload
        },

        SET_USERNAME(state,action){
            state.name = action.payload
    },
    SET_USER(state,action){
        const {name,email,phone, bio,photo, _id} = action.payload
        state.user.name = name
        state.user.email = email
        state.user.phone = phone
        state.user.bio = bio
        state.user.photo = photo
        state.user._id = _id
    }
},
extraReducers:{
    [getUserData.pending]: (state) => {
        state.status = 'loading';
      },
      [getUserData.fulfilled]: (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      },
      [getUserData.rejected]: (state) => {
        state.status = 'failed';
      },

}
})
export const  {SET_LOGIN, SET_USER, SET_USERNAME} = authSlice.actions
export const selectIsLoggedIn = (state)=> state.auth.isLoggedIn
export const selectName = (state)=> state.auth.name
export const selectUser = (state)=> state.auth.user


export default authSlice.reducer