const express = require("express");
const { User } = require("../models/user");
const tokenAuth = require("../middleware/token-auth");
const router = express.Router();

router.get("/", tokenAuth, async (req, res) => {
	const userId = req.user._id;
	const user = await User.findById(userId);
	res.status(200).send(user);
});

module.exports = router;
