const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const signUp = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });
		if(!user) { 							 												  // saltRounds
			const saltedHash = await bcrypt.hash(req.body.password, 10);
			const newUser = await UserModel.create({"email":req.body.email, "password": saltedHash});
			res.status(200).json(newUser);
		} else {
			return res.status(400).json({error: `User email ${req.body.email} already exists.`});
		}
	} catch(e) {
		res.status(400).json({error: e});
	}
}

const logIn = async (req, res) => {
	try {
		let user = await UserModel.findOne({ email: req.body.email });
		let match = await bcrypt.compare(req.body.password, user.password);
		if(user && match) {
			res.status(200).json(user);
		} else {
			res.status(401).json({error: "Auth Failure"})
		}
	} catch(e) {
		res.status(400).json({error: "Auth Failure"})
	}
}

const getToken = async (req, res) => {
	try {
		let user = await UserModel.findOne({ email: req.body.email });
		let match = await bcrypt.compare(req.body.password, user.password);
		if(user && match) {
			const token = await jwt.sign({
					email: user.email,
					userId: user._id
				}, 
				process.env.JWT_KEY,
				{
					expiresIn: "1h"
				}
			)
			res.status(200).json({token});
		}
	} catch(e) {
		res.status(400).json({error: e})
	}
}

module.exports = {
	signUp,
	logIn,
	getToken
}