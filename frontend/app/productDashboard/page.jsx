"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CALC_TOTAL_VALUE, deleteProduct, getProduct, getProductStatus, selectAllProducts, selectTotalPrice } from '@/Redux/Slices/productSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FILTER_BY_CATEGORY, FILTER_BY_SEARCH, selectFilteredPoducts } from '@/Redux/Slices/filterSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductStatus);
const filteredProducts = useSelector(selectFilteredPoducts);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  
  const totalValue = useSelector(selectTotalPrice)
  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProduct());
  };


function  handleFilteredPoducts(category){
dispatch(FILTER_BY_CATEGORY({products,category})) 
 console.log(totalValue );
 console.log(products);

 }

 function  handleSearchPoducts(e){
  const {value} = e.target
  let search = value
  dispatch(FILTER_BY_SEARCH({products,search})) 
   }

 useEffect(() => {
 // "All" as the default category
  dispatch(FILTER_BY_CATEGORY({ products, category: "All" }));
  // console.log(Number(products[0]?.quantity))

}, [dispatch, products]); 

useEffect(() => {
dispatch(CALC_TOTAL_VALUE(products))

}, [dispatch,products]);

  const categories = ["All", ...Array.from(new Set(products.map(item => item.category)))];
  const catLength = categories.length -1 // minus the "All" 
  console.log(catLength);
console.log(categories);
  if (status === 'loading') {
    return <div className="bg-black text-white p-4">Loading...</div>;
  } else if (status === 'succeeded') {
    return (
      <main className=' flex justify-between bg-black'>
      <div className="bg-black text-white p-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-purple-500 text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-300">SKU: {product.sku}</p>
            <p className="text-gray-300">Category: {product.category}</p>
            <p className="text-gray-300">Quantity: {product.quantity}</p>
            <p className="text-gray-300">Description: {product.description}</p>
            <p className="text-gray-300">Price: ${product.price}</p>         <button className="text-gray-300" onClick={()=>delProduct(product._id)}>delete</button>

            <Link href={`./editProduct/${product._id}`} className="text-gray-300 block" >Edit</Link>
            <Image width={400} height={400}  src={product.images[0].filePath} alt={product.name} className="mt-2 rounded-md" />
          </div>
        ))}
      </div>
      <div className="bg-black text-white p-4">
        <p>{categories.map((category, index) =><button key={index} className='block' onClick={()=>handleFilteredPoducts(category)}>{category}</button> )}</p>
     <input className=' text-black' onChange={(e)=>handleSearchPoducts(e)} type="text" />
     <p className=' text-white'>Total value {totalValue}</p>
     <p className=' text-white'>No of categories {catLength}</p>

      </div>
      </main>
    );
  }

}
