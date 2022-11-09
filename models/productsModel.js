const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	features: {
		type: [String],
		required: false,
	},
	description: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true
	},
	productLinks: {
		type: [String],
		required: false
	}
})

module.exports = mongoose.model("ProductsModel", ProductsSchema);