"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProduct, getProductStatus, selectAllProducts } from '@/Redux/Slices/productSlice';
import Image from 'next/image';

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductStatus);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProduct());
  };


  if (status === 'loading') {
    return <div className="bg-black text-white p-4">Loading...</div>;
  } else if (status === 'succeeded') {
    return (
      <div className="bg-black text-white p-4">
        {products.map((product) => (
          <div key={product._id} className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-purple-500 text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-300">SKU: {product.sku}</p>
            <p className="text-gray-300">Category: {product.category}</p>
            <p className="text-gray-300">Quantity: {product.quantity}</p>
            <p className="text-gray-300">Description: {product.description}</p>
            <p className="text-gray-300">Price: ${product.price}</p>         <button className="text-gray-300" onClick={()=>delProduct(product._id)}>delete</button>

            {/* Add image rendering logic here */}
            <Image width={400} height={400}  src={product.images[0].filePath} alt={product.name} className="mt-2 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  return <div className="bg-black text-white p-4">hi</div>;
}
