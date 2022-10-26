const OrdersModel = require('../models/ordersModel');

// create
const createOrder = async (req, res) => {
	res.status(200).json({message: "Handling post request"});
	let order;
	try {
		const orderExists = await OrdersModel.findOne({"name": req.body.name});
		if(orderExists) {
			order = await OrdersModel.findOneAndUpdate({name: req.body.name}, {...req.body});
		} else {
			order = await OrdersModel.create({ ...req.body })
		}
		res.status(200).json({success: req.body});
	} catch (e) {
			res.status(400).json({error: e.message});
	}
}

// read
const getOrders = async (req, res) => {
	const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	try {
		const response = await OrdersModel.find({});
		const data = response.map(order => {
			const { name, price, inStock, _id } = order;
			return { name, price, inStock, _id, "url": `${fullUrl}/${order._id}` };
		})
		res.status(200).json(data);
	} catch(e) {
		console.log(e);
	}
}

const getOrder = async (req, res) => {
	const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	try {
		const response = 	await OrdersModel.findById(req.params.productId);
		const { name, price, inStock, _id } = response;
		const data = { name, price, inStock, _id, "url": `${fullUrl}/${response._id}` };
		res.status(200).json(data);
	} catch(e) {
		console.log(e);
	}
}

// update
const updateOrder = async (req, res) => {
	await OrdersModel.findOneAndUpdate({ "name": req.body.name}, { ...req.body })
	.then(data => res.status(200).json({success: req.body}))
	.catch(err => res.status(400).json({error: err.message}))
}

// delete
const deleteOrder = async (req, res) => {
	await OrdersModel.findByIdAndDelete(req.params.productId)
	.then(data => res.status(200).json({"successfully deleted": req.body}))
	.catch(e => console.error({error: e}))
}

module.exports = {
	createOrder,
	getOrders,
	getOrder,
	updateOrder,
	deleteOrder
}