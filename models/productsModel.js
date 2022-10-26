const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	inStock: {
		type: Boolean,
		required: true
	}
})

module.exports = mongoose.model("ProductsModel", ProductsSchema);