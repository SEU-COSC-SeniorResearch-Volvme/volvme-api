'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Group = new Schema({

	_id: Schema.Types.ObjectId(),
	name: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		isAdmin: Boolean
	}],
	projects: [{
		type: Schema.Types.ObjectId,
		ref: 'Project'
	}]
}, {timestamps: true});

module.exports = mongoose.model('Group', Group);