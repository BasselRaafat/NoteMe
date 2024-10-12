const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Note } = require("../models/note");
dotenv.config({ path: "../.env" });

async function authorAuth(req, res, next) {
	const noteId = req.params.id;
	const userId = req.user._id;
	try {
		const note = await Note.findById(noteId);
		if (!note) return res.sendStatus(404);
		if (userId !== note.author.toString()) return res.sendStatus(401);
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = { authorAuth };
