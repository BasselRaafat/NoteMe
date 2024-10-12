const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User } = require("../models/user");
const tokenAuth = require("../middleware/token-auth");
const {
	signUpValidator,
	signInValidator,
} = require("../schema validation/auth-validation");

const router = express.Router();
let refreshTokens = [];

//sign up
router.post("/signup", signUpValidator, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json(errors);
	const { username, email, password } = req.body;
	const hashedPassword = await bcryptjs.hash(password, 10);
	try {
		const user = new User({
			username: username,
			email: email,
			password: hashedPassword,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
});

//sign in
router.post("/signin", signInValidator, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json(errors);
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email: email });
		if (!user) return res.send(404).send("User Not Found");
		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch) return res.status(401).send("Autentication Faile");

		const accessToken = jwt.sign(
			{ _id: user._id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "10m" }
		);

		const refreshToken = jwt.sign(
			{ _id: user._id },
			process.env.REFRESH_TOKEN_SECRET
		);
		refreshTokens.push(refreshToken);
		res
			.status(200)
			.send({ accessToken: accessToken, refreshToken: refreshToken });
	} catch (error) {
		next(error);
	}
});

router.delete("/signout", tokenAuth, (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.status(200).send("Logout Successfully");
});

router.post("/token", (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (!refreshTokens.includes(refreshToken)) {
		return res.sendStatus(403);
	}
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
		if (error) {
			next(error);
			return;
		}
		const accessToken = jwt.sign(
			{ _id: user._id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "10m" }
		);
		res.status(201).json(accessToken);
	});
});



module.exports = router;
