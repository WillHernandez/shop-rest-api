const jwt = require('jsonwebtoken');
// require('dotenv').config();

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]; // removing Bearer from our token string
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		// adding our verified jwt as a value on our req object
		req.userData = decoded;
		next();
	} catch(e) {
		res.status(401).json({error: "Auth failed"});
	}
}