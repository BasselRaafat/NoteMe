const { body } = require("express-validator");


const noteVaildator= [
		body("title")
			.exists()
			.withMessage("Title Is Required")
			.trim()
			.notEmpty()
			.withMessage("Title Can't Be Empty")
	];

module.exports = { noteVaildator };
