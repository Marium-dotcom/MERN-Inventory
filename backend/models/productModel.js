const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true // trim the spaces 
  },
  sku: {
    type: String,
    required: true,
    default: "SKU" // trim the spaces 
  },
  category: {
    type: String,
    required: true,
    trim: true // trim the spaces
  },
  quantity: {
    type: Number,
    required: true,
    trim: true // trim the spaces

  },
  description: {
    type: String,
    required: true,
    trim: true // trim the spaces

  },
  images: {
    type: [Object], // Change the type to an array of objects
    default: []
  },
  price: {
    type: Number
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
