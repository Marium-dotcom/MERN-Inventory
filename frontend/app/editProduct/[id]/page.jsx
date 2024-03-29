"use client"
import {  editProduct, getSingleProduct, selectProduct } from '@/Redux/Slices/productSlice';
import ProductForm from '@/app/productForm/page';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const edtProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productEdit = useSelector(selectProduct);
    console.log(productEdit);
    const [product, setProduct] = useState(productEdit || {name: "",sku:"",category: "",quantity: "",price: "", description:"" ,     images: [],
  } );
    const router = useRouter()


console.log(product);
useEffect(() => {
  // Update the local state when the productEdit changes
  setProduct(productEdit || {name: "",sku:"",category: "",quantity: "",price: "", description:"", images: [] } );
}, [productEdit]);


useEffect(() => {
  
  dispatch(getSingleProduct(id));
}, [dispatch, id]);

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
    for (let i = 0; i < product?.images.length; i++) {
      formData.append('images', product?.images[i]);
    }

    console.log(...formData);

    await dispatch(editProduct({ id, formData }));
    router.push('/productDashboard')
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
  const handleOutOfStockClick = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantity: 0,
    }));
  };


    return (
      
      <>
      <ProductForm    handleFormSubmit={handleFormSubmit}
   handleInputChange={handleInputChange}
   product={product}
   handleImageChange={handleImageChange}
   type={"edit"}
   handleOutOfStockClick={handleOutOfStockClick}
/>
      </>
    );
}

export default edtProduct;
