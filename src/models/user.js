const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	userName: { type: String, require: true, unique: true },
	email: { type: String, require: true, unique: true },
	password: { type: String, require: true },
});

const User = model("user", userSchema);

module.exports = { User };
