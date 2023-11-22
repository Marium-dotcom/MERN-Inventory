"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {

  return (
<section className="bg-black h-[calc(100vh-64px)] flex items-center justify-center text-center">
      <div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"> 
          StockPulse                        </span>
        </h1>

        <p className="text-gray-400 mx-auto max-w-2xl mb-8">
          Track your stock levels, orders, sales and purchases in real-time. Our automated system provides insightful reports to help make data-driven decisions.
        </p>
        
        <button className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded text-gray-100  mr-4">
                   <Link href={"./auth/register"}>  Register  </Link>

        </button>

        <button className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded text-gray-100  ml-4">
        <Link href={"./auth/login"}>  Login  </Link>
        </button>
      </div>
    </section>

);

  
}
