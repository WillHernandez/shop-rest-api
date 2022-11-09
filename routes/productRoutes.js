const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { createProduct, getProducts, getSingleProduct, getProductBrand, updateProduct, deleteProduct } = require('../controllers/productsController');

// add authentication middle-ware. gets called prior to the main handling function
// we will allow the end user to get all products or a particular product without a token but NOT make changes to the products in our db

router.post('/', checkAuth, createProduct);
router.get('/', getProducts);
router.get('/:brand/:name', getSingleProduct);
router.get('/:brand', getProductBrand);
router.patch('/', checkAuth, updateProduct);
router.delete('/', checkAuth, deleteProduct);
module.exports = router;