import React from 'react';
import { cookies } from "next/headers";

async function getUserProfile(){
    let res =   await fetch(`http://localhost:8000/api/users/getUser`, {  
        headers: { Cookie: cookies()},

 } );
        return await res.json();
   }





const Profile = async () => {

const data = await getUserProfile();
console.log("User :", data);
return (
    <div className="bg-black text-white p-4">
    <h1 className="text-2xl font-bold mb-4">User Profile</h1>
    {data && (
      <div>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <img src={data.photo} alt="User Photo" className="w-32 h-32 rounded-full my-2" />
        <p>Phone: {data.phone}</p>
        <p>Bio: {data.bio}</p>
      </div>
    )}
  </div>

    );
}

export default Profile;
