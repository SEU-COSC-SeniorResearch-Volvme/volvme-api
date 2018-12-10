'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateUnique = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const Account = new Schema({

	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		index: true,
		required: [true, "Don't be shy! We need to know your name to sign you up :)"],
		description: "Preferably your real name, but whatever name you go by will work for us :)",
		example: "John Doe or 5oz. Woozy"
	},
	email: {
		type: String,
		index: true,
		required: [true, "An email is required for signup"],
		lowercase: true,
		unique: true,
		uniqueCaseInsensitive: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        description: "A valid email address",
        example: "username@mail.com or user.name@email.org"
    },
	hash: {
		type: String,
		required: true
	},
	salt: {
		type: String:,
		required: true
	}
	//createdAt/updatedAt Timestamps
}, {timestamps: true});

//Mongoose Plugin to validate unique fields
Account.plugin(validateUnique, {message: 'This {PATH} is already associated with a Volvme User!'});

Account.methods.create = function(){

	const new_account = new Account({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email
	})
	.setPassword(req.body.password)
	.generateJWT()
	new_user.save(function(err, new_user){
    	if (err) return next(err);
    	return res.status(200).send(new_user);
    });
};

Account.methods.setPassword = function(password){

	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

Account.methods.validPassword = function(password) {

	let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash = hash;
};

Account.methods.generateJWT = function() {

	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this._id,
		name: this.name,
		email: this.email,
		exp: parseInt(exp.getTime() / 1000),
	}, secret );
};

module.exports = mongoose.model('Account', Account);
