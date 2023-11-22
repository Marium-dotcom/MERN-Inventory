"use client"
import { createSlice } from "@reduxjs/toolkit"

let name

if (typeof window !== "undefined") {
name = JSON.parse(localStorage.getItem("name")) || ""
}
const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    user: {
        name: "",
        email:"",
        phone:"",
        bio:"",
        photo:""
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
            localStorage.setItem('name', JSON.stringify(action.payload));
            state.name = action.payload
    },
    SET_USER(state,action){
        const {name,email,phone, bio,photo} = action.payload
        state.user.name = name
        state.user.email = email
        state.user.phone = phone
        state.user.bio = bio
        state.user.photo = photo
    }
}
})
export const  {SET_LOGIN, SET_USER, SET_USERNAME} = authSlice.actions
export const selectIsLoggedIn = (state)=> state.auth.isLoggedIn
export const selectName = (state)=> state.auth.name
export const selectUser = (state)=> state.auth.user


export default authSlice.reducer