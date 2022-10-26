const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true, // does not validate data. optimizes db knowing each email is unique
	},
	password: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('UserModel', UserSchema)