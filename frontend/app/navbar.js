"use client"
import { SET_LOGIN, SET_USER, SET_USERNAME, selectIsLoggedIn, selectName, selectUser } from '@/Redux/Slices/authSlice';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AuthInitializer from './AuthInitializer';

export default function Nav() {
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const name = useSelector(selectName);
  let id
  if (typeof localStorage !== 'undefined') {
     id = localStorage.getItem('id');
  }   
console.log(id);
  
  async function logout(){
  try {
    await axios.get("http://localhost:8000/api/users/logout", {
      withCredentials: true,
    });
  dispatch(SET_LOGIN(false))
  dispatch(SET_USERNAME(""))
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("name")
  localStorage.removeItem("id")

  router.push("/")
  return response.data;


  } catch (error) {
    console.log(error);
  }
}

console.log(isLoggedIn);
return (
  <AuthInitializer>
<nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white text-lg font-bold">
<Link href={"/"}> StockPulse    </Link>          </h1>
            </div>
          </div>
          <div className="flex">
            {/* Add your navigation links here */}
            <Link className=' text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' href={"/productDashboard"}> <button> Dashboard  </button>  </Link>    

            {/* <Link href={"/"} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link> */}
            {isLoggedIn && ( <Link href={"/addProduct"} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Product</Link>)}
            {isLoggedIn && (
  <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">logout</button>
)}
            {name && (
            <Link href={`/profile/${id}`} className="text-white">{name}</Link>
          )}

          </div>
        </div>
      </div>
    </nav> </AuthInitializer> )
}
