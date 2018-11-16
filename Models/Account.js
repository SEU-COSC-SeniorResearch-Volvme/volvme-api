'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({

	_id: Schema.Types.ObjectId,
	username: {
		type: String //needs to be the current user's _id:,
		required: true
	},
	location: {
		type: String, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        required: [true, 'Account Horequired']
    },
	phone: {
	    type: String,
	    unique: true,
	    match: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
	    required: [true, 'Account phone number required']
    },
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Account', Account);
