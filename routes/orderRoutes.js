const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder } = require('../controllers/ordersController');

router.post('/', checkAuth, createOrder);
router.get('/', getOrders);
router.get('/:orderId', getOrder);
router.patch('/:orderId', checkAuth, updateOrder);
router.delete('/:orderId', checkAuth, deleteOrder);
module.exports = router;