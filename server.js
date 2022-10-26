// const http = require('http');
// const server = http.createServer();
// server.listen(port)
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

// middleware to catch all errors thrown in app
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
})
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({error: {
		message: err.message,
	}})
})

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		app.listen(port, () => {
			console.log(`MongoDb connected / Server running on port ${port}`);
		});
	} catch(e) {
		console.error(e);
	}
}
dbConnect();