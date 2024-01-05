"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN, SET_USER, SET_USERNAME, selectIsLoggedIn, selectUser } from '@/Redux/Slices/authSlice';

export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn);

//   if(isLoggedIn){
// router.push('/')
//   }
  const initialState = {
    name: "",
    email: "",
    password: ""  }

    const [formData, setFormData] = useState(initialState);
const { email, password, name} = formData


function handleInputChange(e) {
const {name, value} = e.target
setFormData({...formData, [name]: value})
}


async function  formSubmit(e)
{
  e.preventDefault()
  if(!name || !email || !password ){
    console.log("Please fill all required fields");
  }
  if(password.length < 6){
    console.log("Password must be at least 6 characters");
  }
  

  try {
    console.log(formData);
     const response = await axios.post(`http://localhost:8000/api/users/register`, formData, {withCredentials: true})
     router.push("/productDashboard")
     dispatch(SET_USERNAME(response.data.name))
     localStorage.setItem("name", response.data.name)

     await dispatch(SET_LOGIN(true))
     dispatch(SET_USER(response.data))
     return response.data

 } catch (error) {

  console.log(error);
}}

  return (
    <div className="bg-black h-[calc(100vh-64px)] flex items-center justify-center">
      {!isLoggedIn?
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl text-center mb-6">Register</h2>
        <form onSubmit={(e)=>formSubmit(e)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input onChange={handleInputChange} className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" value={name} name="name" type="text" placeholder="Enter your name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input onChange={handleInputChange} className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" value={email} name="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={handleInputChange} className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" value={password} name="password" type="password" placeholder="Enter your password" />
          </div>
       
          <div className="flex justify-center">
            <button className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>:""}
    </div>
  )
}
