const ProductsModel = require('../models/productsModel');

// create
const createProduct = async (req, res) => {
	let product;
	try {
		const productExists = await ProductsModel.findOne({"name": req.body.name});
		if(productExists) {
			product = await ProductsModel.findOneAndUpdate({name: req.body.name}, {...req.body});
		} else {
			product = await ProductsModel.create({ ...req.body })
		}
		res.status(200).json({success: req.body})
	} catch (e) {
			res.status(400).json({error: e.message});
	}
}

// read
const getProducts = async (req, res) => {
	const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	try {
		const response = await ProductsModel.find({});
		const data = response.map(prod => {
			const { name, price, inStock, _id } = prod;
			return { name, price, inStock, _id, "url": `${fullUrl}/${prod._id}` };
		})
		res.status(200).json(data);
	} catch(e) {
		console.log(e);
	}
}

const getProduct = async (req, res) => {
	const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	try {
		const response = 	await ProductsModel.findById(req.params.productId);
		const { name, price, inStock, _id } = response;
		const data = { name, price, inStock, _id, "url": `${fullUrl}/${response._id}` };
		res.status(200).json(data);
	} catch(e) {
		console.log(e);
	}
}

// update
// if using findById, we can just pass param. if using another method eg findOneAndUpdate that doesnt specify its a search by id, u must use an object and explicitly state what the search param is.. eg findOneAndUpdate({_id: req.params.productId})
const updateProduct = async (req, res) => {
	await ProductsModel.findOneAndUpdate({ "email": req.body.email}, { ...req.body })
	.then(data => res.status(200).json(data))
	.catch(err => res.status(400).json({error: err.message}))
}

// delete
const deleteProduct = async (req, res) => {
	await ProductsModel.findByIdAndDelete(req.params.productId)
	.then(data => res.status(200).json(data))
	.catch(e => console.error({error: e}))
}

// BE CAREFUL!!! only run to clean up our db
// const deleteAllProducts = async (req, res) => {
// 	try {
// 		await ProductsModel.deleteMany({})
// 	} catch (e) {
// 		res.status(400).json({error: e});
// 	}
// }
// deleteAllProducts()


module.exports = {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct
}