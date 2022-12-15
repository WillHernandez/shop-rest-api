const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	cartItems: {
		type: [{}],
		required: true
	},
})

module.exports = mongoose.model("OrdersModel", OrdersSchema);