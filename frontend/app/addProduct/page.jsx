"use client"
import { selectIsLoggedIn } from '@/Redux/Slices/authSlice';
import { postProduct } from '@/Redux/Slices/productSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProductForm from '../productForm/page';

const AddProductForm = () => {
  const dispatch = useDispatch();

  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    price: 0,
    description: '',
    images: [],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('sku', product.sku);
    formData.append('category', product.category);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    formData.append('description', product.description);
  
    // Append images to formData
    for (let i = 0; i < product.images.length; i++) {
      formData.append('images', product.images[i]);
    }
  
    try {
      dispatch(postProduct(formData))
      .then(data => {
      // Reset the form fields after submission
      setProduct({
        name: '',
        sku: '',
        category: '',
        quantity: 0,
        price: 0,
        description: '',
        images: [],
      });
      router.push('/productDashboard')

      })
      .catch(err => {
console.log(err);      });
  
  
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: Array.from(files),
    }));
  };

  console.log(product);

  return (
    <>
    {isLoggedIn?
   <ProductForm 
   handleFormSubmit={handleFormSubmit}
   handleImageChange={handleImageChange}
   handleInputChange={handleInputChange}
   product={product}
   
   />
   : <h1 className='bg-black h-[calc(100vh-64px)] flex flex-col justify-center items-center text-white'>PLEASE LOGIN</h1>}</>
  );
};

export default AddProductForm;
