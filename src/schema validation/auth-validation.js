const { body } = require("express-validator");

const signUpValidator = [
	body("username")
		.exists()
		.withMessage("User Name Is Required")
		.trim()
		.notEmpty()
		.withMessage("User Name Can't be empty"),
	body("email")
		.exists()
		.withMessage("Email Is Required")
		.trim()
		.notEmpty()
		.withMessage("Email Can't be empty")
		.isEmail()
		.withMessage("Must Be A Vaild Email"),
	body("password")
		.exists()
		.withMessage("Password Is Required")
		.trim()
		.notEmpty()
		.withMessage("Password Can't be empty")
		.isLength({ min: 5 })
		.withMessage("Muset Be Grater Than 5 Charcaters"),
];

const signInValidator = [
	body("email")
		.exists()
		.withMessage("Email Is Required")
		.notEmpty()
		.withMessage("Email Can't be empty")
		.isEmail()
		.withMessage("Must Be A Vaild Email"),
	body("password")
		.exists()
		.withMessage("Password Is Required")
		.notEmpty()
		.withMessage("Password Can't be empty"),
];

module.exports = { signUpValidator, signInValidator };
