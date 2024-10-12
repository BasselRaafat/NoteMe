const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = () => {
	mongoose.connect(process.env.DB_URL);
	console.log("DB Connected");
};

module.exports = { connectDB };
