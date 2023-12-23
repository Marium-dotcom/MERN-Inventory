const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2


//create a product
const createProduct = asyncHandler(async(req, res, next)=>{
const {name, price, sku, category, quantity,description} = req.body
if(!name || !sku || !category || !quantity || !description ||  !price ){
    res.status(400)
    throw new Error("Please fill all fields")
}
else{

     // handle image upload
     let fileData = [];

     if (req.files) {
        try {
            // Save each image to Cloudinary
            const uploadPromises = req.files.map(async (file) => {
              const uploadFile = await cloudinary.uploader.upload(file.path, {
                folder: "Stock",
                resource_type: "image",
              });
    
              return {
                fileName: file.originalname,
                filePath: uploadFile.secure_url,
                fileType: file.mimetype,
                fileSize: fileSizeFormatter(file.size, 2),
              };
            });
    
            // Wait for all uploads to complete
            fileData = await Promise.all(uploadPromises);
          } catch (error) {
            throw new Error(error);
          }
        }
    
    
 
     const product = await Product.create({
       user: req.user.id,
       name,
       price,
       sku,
       category,
       quantity,
       description,
       images: fileData,
     });
 
res.status(201).json(product)
}

})


//get product
const getProduct = asyncHandler(async(req, res, next)=>{
    const product = await Product.find({user: req.user.id})
    // console.log(product);
    // console.log(req.user.id);
    

    if(!product){
        res.status(404)
        throw new Error("Product not found")

    }

        res.status(200).json(product)



})


//get single product
const getSingleProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
      // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  
  
    res.status(200).json(product);
  });


  //delete single product

  const deleteSingleProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await Product.deleteOne({ _id: req.params.id }); 
    res.status(200).json(product)  
  })


  
// update product
const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, sku, category, quantity, price, description } = req.body;
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // handle image upload
  let fileData = [];

  if (req.files && req.files.length > 0) {
    // Save each image to Cloudinary
    const uploadPromises = req.files.map(async (file) => {
      const uploadFile = await cloudinary.uploader.upload(file.path, {
        folder: "Stock",
        resource_type: "image",
      });

      return {
        fileName: file.originalname,
        filePath: uploadFile.secure_url,
        fileType: file.mimetype,
        fileSize: fileSizeFormatter(file.size, 2),
      };
    });

    // Wait for all uploads to complete
    fileData = await Promise.all(uploadPromises);
  } else {
    // No new images uploaded, retain existing images
    fileData = product.images || [];
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      sku,
      category,
      quantity,
      price,
      description,
      images: fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});




  module.exports = {createProduct, getProduct, getSingleProduct, deleteSingleProduct,updateProduct}