"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { SET_USERNAME } from '@/Redux/Slices/authSlice'
import { useDispatch } from 'react-redux'

export default function Login() {
  const router = useRouter()
const dispatch = useDispatch()
  const initialState = {
    email: "",
    password: ""
  }

  const [login, setLogin] = useState(initialState);
const {email, password} = login


function handleInputChange(e) {
const {name, value} = e.target
setLogin({...login, [name]: value})
}

async function handleSubmit(e){
e.preventDefault()
if( !email || !password ){
  console.log("Please fill all required fields");
}

try {
  console.log(login);
   const response = await axios.post(`http://localhost:8000/api/users/login`, login, {withCredentials: true})
   console.log("test res", JSON.stringify(response, null, 2));
   console.log("test name", response.data.name);
   dispatch(SET_USERNAME(response.data.name))
localStorage.setItem("name", response.data.name)
if(response.status === 200){
  router.push("/productDashboard")
}

   return response.data
} catch (error) {
   console.log(error.response.data);

}

}

  return (
    <div className="bg-black h-[calc(100vh-64px)] flex items-center justify-center">
    <div className="bg-white p-8 rounded-md shadow-lg">
      <h2 className="text-2xl text-center mb-6">Login</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input onChange={handleInputChange} value={email} name="email" className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input onChange={handleInputChange} value={password} name="password" className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" id="password" type="password" placeholder="Enter your password" />
        </div>
        <div className="flex justify-center">
          <button className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>  )
}
