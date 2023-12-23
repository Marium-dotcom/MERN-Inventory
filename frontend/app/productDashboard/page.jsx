"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

export default function Dashboard() {
  
async  function getProducts(){
  const {data} = await axios.get(`http://localhost:8000/api/getProduct`,{
    withCredentials: true,
  })
   console.log(data);

  // return data;

  }


  useEffect(() => {
    
   getProducts()
  }, []);

  return (
    <div className="bg-black h-[calc(100vh-64px)] text-white flex items-center justify-center">
    Dashboard</div>
  )
}
