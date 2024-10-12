const { Schema, model, models } = require("mongoose");

const noteSchema = new Schema({
	title: { type: String, required: true, trim: true },
	content: { type: String, required: true },
	author: { type: Schema.Types.ObjectId,ref:"user" ,required: true },
});

const Note = model("note", noteSchema);

module.exports = { Note };
