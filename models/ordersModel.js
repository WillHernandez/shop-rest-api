const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
	orders: {
		type: [{
			name: String,
			count: Number,
		}],
		required: true
	}
})

module.exports = mongoose.model("OrdersModel", OrdersSchema);