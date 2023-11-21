const express = require('express');
const router = express()
const { createProduct, getProduct, getSingleProduct, deleteSingleProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

router.post('/createProduct', authMiddleware, upload.array('images'), createProduct);
router.get('/getProduct/:userid',authMiddleware, getProduct)
router.get('/getSingleProduct/:id', authMiddleware, getSingleProduct)
router.delete('/deleteProduct/:id', authMiddleware, deleteSingleProduct)
module.exports = router