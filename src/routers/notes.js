const express = require("express");
const { validationResult } = require("express-validator");
const { noteVaildator } = require("../schema validation/note-validation");
const tokenAuth = require("../middleware/token-auth");
const { Note } = require("../models/note");
const { authorAuth } = require("../middleware/author-auth");

const router = express.Router();

router.get("/", tokenAuth, async (req, res, next) => {
	const user = req.user;
	try {
		console.log(user._id);
		const note = await Note.find({ author: user._id }).populate("author");
		res.status(200).send(note);
	} catch (error) {
		next(error);
	}
});
router.get("/:id", tokenAuth, async (req, res, next) => {
	const user = req.user;
	const id = req.params["id"];
	try {
		const note = await Note.find({ _id: id, author: user._id }).populate(
			"author"
		);
		res.status(200).send(note);
	} catch (error) {
		next(error);
	}
});

router.post("/", tokenAuth, noteVaildator, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("from validator");
		return res.status(400).json(errors);
	}
	const { title, content } = req.body;
	const user = req.user;
	try {
		const newNote = await Note.insertMany({
			title: title,
			content: content,
			author: user._id,
		});
		res.status(201).send(newNote);
	} catch (error) {
		next(error);
	}
});

router.patch("/:id", tokenAuth, authorAuth, async (req, res, next) => {
	const { title, content } = req.body;
	const _id = req.params.id;
	try {
		const oldNote = await Note.findOneAndUpdate(
			{ _id: _id },
			{ title: title, content: content }
		);
		res.status(201).send(oldNote);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", tokenAuth, authorAuth, async (req, res, next) => {
	const _id = req.params.id;
	try {
		const oldNote = await Note.deleteOne({ _id: _id });
		res.status(201).send(oldNote);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
