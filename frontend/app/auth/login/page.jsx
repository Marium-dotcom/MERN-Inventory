import React from 'react'

export default function Login() {
  return (
    <div className="bg-black h-[calc(100vh-64px)] flex items-center justify-center">
    <div className="bg-white p-8 rounded-md shadow-lg">
      <h2 className="text-2xl text-center mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" id="password" type="password" placeholder="Enter your password" />
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
