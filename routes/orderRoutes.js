const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder } = require('../controllers/ordersController');

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:email', getOrder);
router.patch('/:email', updateOrder);
router.delete('/:orderId', deleteOrder);
module.exports = router;