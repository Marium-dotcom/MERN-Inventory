"use client"
import { getUserData, selectUser } from '@/Redux/Slices/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
const {id} = useParams()
console.log(id);
useEffect(() => {
  
  dispatch(getUserData())
  
}, [dispatch]);

// useEffect(() => {
//   // Update the local state when the productEdit changes
//   setProduct(productEdit || {name: "",sku:"",category: "",quantity: "",price: "", description:"", images: [] } );
// }, [productEdit]);

  return (
    <div className="bg-black h-screen text-white p-8">
      {user.photo && (
        <Image width={300} height={300} src={user.photo} alt={user.name} className="rounded-full w-20 h-20 mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p className="text-sm mb-2">{user.email}</p>
      <p className="text-sm mb-2">{user.phone}</p>
      <p className="text-sm mb-4">{user.bio}</p>
      <button><Link href={`./update/${id}`}>edit</Link> </button>
    </div>
  );
};

export default Profile;
