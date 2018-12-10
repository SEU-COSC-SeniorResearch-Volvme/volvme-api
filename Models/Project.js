'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema({

	_id: Schema.Types.ObjectId,
	title: {
		type: String,
		required: true,
		description: "A name for the entire project.",
		example: "Downtime or A Kid Named Cudi."
	},
	creator: {
		type: Schema.Types.ObjectId, ref: "User",
		required: true
	},
	contributors: [{
		type: Schema.Types.ObjectId, ref: "User", 
		isAdmin: Boolean
	}],
	content: {
		images: [String],
		audio: [String],
		video: [String]
	}
	//createdAt/upatedAt timestamps
}, {timestamps: true});

module.exports = mongoose.model("Project", Project);