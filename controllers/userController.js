require('dotenv').config();
const express = require('express');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });
		if(!user) { 							 												  // saltRounds
			const saltedHash = await bcrypt.hash(req.body.password, 10);
			await UserModel.create({"email":req.body.email, "password": saltedHash});
			res.status(200).json({success: "User created"});
		} else {
			return res.status(400).json({error: `User email ${req.body.email} already exists.`});
		}
	} catch(e) {
		res.status(400).json({error: e});
	}
}

const logIn = async (req, res) => {
	try {
		// user exists
		const user = await UserModel.findOne({ email: req.body.email });
		// Pw is a match for user: 		pw provided in request, salted pw from db
		const match = await bcrypt.compare(req.body.password, user.password); 
		if(user && match) { // create a token for auth
			const token = await jwt.sign({
					email: user.email,
					userId: user._id
				}, 
				process.env.JWT_KEY,
				{
					expiresIn: "1h"
				}
			)
			res.status(200).json({message: "Auth successful", "token": token}); // returns to us our token
		} else {
			res.status(401).json({failure: `Auth Failure.`});
		}
	} catch(e) {
		res.status(400).json({error: e})
	}
}

module.exports = {
	signUp,
	logIn
}