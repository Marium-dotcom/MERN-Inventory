"use client"
import { EditUserData, getUserData, selectUser } from '@/Redux/Slices/authSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProfile = () => {
    let dispatch = useDispatch()
    const router = useRouter()

    const user = useSelector(selectUser);
    const { email } = user;
    const [profileImage, setProfileImage] = useState("");
    const [imagePreview,setImagePreview] = useState(null)
    const handleImageChange = (e) => {
      setProfileImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      
    };
    
  
    useEffect(() => {
      if (!email) {
router.push("/")   }
    }, [email]);
    
    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo
      };
      const [profile, setProfile] = useState(initialState);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
  

      };
    


    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          // Handle Image upload
          let imageURL;
          if (
            profileImage &&
            (profileImage.type === "image/jpeg" ||
              profileImage.type === "image/jpg" ||
              profileImage.type === "image/png")
          )
           {
            const image = new FormData();
            image.append("file", profileImage);
            image.append("cloud_name", "dweh6j06t");
            image.append("upload_preset", "i5t4hnxo");
    
            // // First save image to cloudinary
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dweh6j06t/image/upload",
              { method: "post", body: image }
            );
            const imgData = await response.json();
            imageURL = imgData.url.toString();
    
            // Save Profile
            const formData = {
              name: profile.name,
              phone: profile.phone,
              bio: profile.bio,
              photo: profileImage ? imageURL : profile.photo,

            };
    
await dispatch(EditUserData(formData))
            console.log(formData);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    return (
        <div className=' bg-black text-white h-screen'>
  <form onSubmit={handleFormSubmit} className="max-w-md">
        <div>
       
{!imagePreview?        <Image width={300} height={300} src={profile.photo} alt={profile.name} className="rounded-full w-20 h-20 mb-4" />
 : <Image alt='img' height={300} width={300} src={imagePreview}></Image>}
       
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="text"
            id="name"
            value={profile?.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="email">
            email
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="text"
            id="email"
            value={profile?.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="phone">
            phone
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="text"
            id="phone"
            value={profile?.phone}
            onChange={handleInputChange}
            name="phone"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="bio">
            bio
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="text"
            id="bio"
            value={profile?.bio}
            onChange={handleInputChange}
            name="bio"
          />
        </div>
        <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>


        <button className="bg-indigo-500 text-white rounded-lg py-2 px-4 hover:bg-indigo-600">
       Edit     </button>
      </form>        </div>
    );
}

export default UpdateProfile;
