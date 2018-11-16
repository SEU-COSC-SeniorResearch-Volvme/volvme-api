'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateUnique = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const User = new Schema({

	_id: Schema.Types.ObjectId, //A Unique _id for this schema
	name: {
		type: String,
		index: true,
		required: [true, "Don't be shy! We need to know your name to sign you up :)"],
		description: "Preferably your real name, but enter whatever name you go by will work for us :)",
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
	phone: {
	    type: String,
	    required: [true, "A phone number required for signup!"],
	    unique: true,
	    match: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
	    description: "7-Digit Phone Number",
	    example: "123-456-7890 or (123)-456-7890"
    },
    location: {
    	type: String,
    	required: [true, "Location Required for Signup!"],
    	match: /([^,]+),\s*(\w{2})\s*(\d{5}(?:-\d{4})?)/,
    	description: "City, State 7-Digit zipcode",
    	example: "Austin, TX 78704 or austin, tx 78704"
    },
	password: {
		type: String,
		required: true
	},
	hash: {type: String, description: "The hash(password) stored for privacy"},
	salt: {type: String, description: "The salt used to hash the password"}
	//createdAt/updatedAt Timestamps
}, {timestamps: true});

//Mongoose Plugin to validate unique fields
User.plugin(validateUnique, {message: 'This {PATH} is already associated with a Volvme User!'});

User.methods.setPassword = function(password){

	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

User.methods.validPassword = function(password) {

	let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash = hash;
};

User.methods.generateJWT = function() {

	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this._id,
		name: this.name,
		exp: parseInt(exp.getTime() / 1000),
	}, secret );
};

User.methods.toAuthJSON = function() {

	return {
		name: this.name,
		email: this.email,
		phone: this.phone,
		location: this.location,
		token: thi.generateJWT(),
	};
};


User.method.index = function(req, res) {
	res.json({
			info: "This is the Volvme api user index point. Refer to the Volvme api index point (../api) for complete api documentation. Thanks for visiting Volvme :)",
			suggestion: "Visit /signup to create a new user with us! :)"
		});
};

User.create = function(){

	const new_user = new User({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		location: req.body.location,
		password: req.body.password
	})
	new_user.save(function(err, new_user){
    	if (err) return next(err);
    	return res.status(200).send(new_user);
    });
};

module.exports = mongoose.model('User', User);