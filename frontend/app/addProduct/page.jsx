"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddProductForm = () => {
  const router = useRouter()

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    price: 0,
    description: '',
    images: [],
  });

  const  handleFormSubmit = async(e) => {
    e.preventDefault();

    // Perform any additional logic here, such as validating the form data or submitting to a server
    const response = await axios.post(
      'http://localhost:8000/api/createProduct',
      product, {
        withCredentials: true,
      }

    );

    if(response.status === 201){
      router.push("/productDashboard")
    }

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
        return response.data;

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
    <div className="bg-black h-[calc(100vh-64px)] flex flex-col justify-center items-center text-white">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form className="max-w-md" onSubmit={handleFormSubmit}>
        <div>
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="text"
            id="name"
            value={product.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="sku">
            SKU
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="text"
            id="sku"
            value={product.sku}
            onChange={handleInputChange}
            name="sku"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="category">
            Category
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="text"
            id="category"
            value={product.category}
            onChange={handleInputChange}
            name="category"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="number"
            id="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            name="quantity"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="price">
            Price
          </label>
          <input
            className="w-full rounded-lg bg-gray-800 text-white pl-2"
            type="number"
            id="price"
            value={product.price}
            onChange={handleInputChange}
            name="price"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full rounded-lg bg-gray-800 text-white p-2"
            id="description"
            value={product.description}
            onChange={handleInputChange}
            name="description"
          ></textarea>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="images">
            Images
          </label>
          <input
            className="text-black"
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button className="bg-indigo-500 text-white rounded-lg py-2 px-4 hover:bg-indigo-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
