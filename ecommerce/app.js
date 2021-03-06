const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const expressValidator = require('express-validator')

// app
const app = express();

//db connection
mongoose.connect(
	process.env.MONGO_URI,
	{useNewUrlParser: true}
).then(() => console.log('DB connected'));

mongoose.connection.on('error', err => {
	console.log(`DB connection error: ${err.message}`)
  });


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator);

// routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});