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

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
	} catch(e) {
		console.error(e);
	}
}

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

connectDB().then(()=> {
	app.listen(port, () => {
		console.log(`MongoDb connected / Server running on port ${port}`);
	});
})