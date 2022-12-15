const ProductsModel = require('../models/productsModel');

// create
const createProduct = async (req, res) => {
	let product;
	try {
		const productExists = await ProductsModel.findOne({"name": req.body.name});
		if(productExists) {
			product = await ProductsModel.findOneAndUpdate({name: req.body.name}, {...req.body});
		} else {
			product = await ProductsModel.create({ ...req.body });
		}
		res.status(200).json({success: product});
	} catch (e) {
			res.status(400).json({error: e.message});
	}
}

// read
const getProducts = async (req, res) => {
	// const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	try {
		const response = await ProductsModel.find({});
		res.status(200).json(response);
	} catch(e) {
		console.log(e);
	}
}

const getSingleProduct = async (req, res) => {
		await ProductsModel.findOne({ name: req.params.name})
		.then(data => res.status(200).json(data))
		.catch(e => console.log({error: e.message}))
}

const getProductBrand = async (req, res) => {
		await ProductsModel.find({ brand: req.params.brand })
		.then(data => res.status(200).json(data))
		.catch(e => console.log({error: e.message}))
}

// update
const updateProduct = async (req, res) => {
	await ProductsModel.findOneAndUpdate({ "name": req.body.name}, { ...req.body })
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
	getProductBrand,
	getSingleProduct,
	getProducts,
	updateProduct,
	deleteProduct
}