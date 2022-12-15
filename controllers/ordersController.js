const OrdersModel = require('../models/ordersModel');

// create
const createOrder = async (req, res) => {
	let order;
	try {
		const orderExists = await OrdersModel.findOne({ email: req.body.email });
		if(orderExists) {
			order = await OrdersModel.findOneAndUpdate({email: req.body.email}, {...req.body});
		} else {
			order = await OrdersModel.create({ ...req.body });
		}
		res.status(200).json({success: req.body});
	} catch (e) {
		res.status(400).json({error: e.message});
	}
}

// read
const getOrders = async (req, res) => {
	await OrdersModel.find({})
	.then(data => res.status(200).json(data))
	.catch(err => res.status(400).json({error: err}))
}

const getOrder = async (req, res) => {
	await OrdersModel.findOne({"email": req.params.email})
	.then(data => res.status(200).json(data))
	.catch(err => res.status(204).json({error: err}))
}

// update
const updateOrder = async (req, res) => {
	await OrdersModel.findOneAndUpdate({ "email": req.params.email}, { ...req.body })
	.then(data => res.status(200).json(data))
	.catch(err => res.status(400).json({error: err.message}))
}

// delete
const deleteOrder = async (req, res) => {
	await OrdersModel.findOneAndDelete({ item: req.params.item })
	.then(data => res.status(200).json(data))
	.catch(e => console.error({error: e}))
}

module.exports = {
	createOrder,
	getOrders,
	getOrder,
	updateOrder,
	deleteOrder
}