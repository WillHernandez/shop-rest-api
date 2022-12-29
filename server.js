const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
// require('dotenv').config();

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		const connHost = await conn.connection.host;
		console.log(`MongoDb connected ${connHost}`);
	} catch(e) {
		console.error(e);
		process.exit(1);
	}
}

app.use(cors({ origin: "*" }));
app.use(express.json());

// routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

connectDB().then(()=> {
	app.listen(port, () => {
		console.log(`listening for requests`);
	});
})