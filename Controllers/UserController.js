const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, autoIndex: false});
const User = require('../Models/User');


exports = User.methods.setPassword = function(password){

	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

exports = User.methods.validPassword = function(password) {

	let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash = hash;
};

exports = User.methods.generateJWT = function() {

	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this._id,
		name: this.name,
		exp: parseInt(exp.getTime() / 1000),
	}, secret );
};

exports = User.methods.toAuthJSON = function() {

	return {
		name: this.name,
		email: this.email,
		phone: this.phone,
		location: this.location,
		token: this.generateJWT(),
	};
};


exports = User.methods.userIndex = function(req, res) {
	res.json({
			info: "This is the Volvme api user index point. Refer to the Volvme api index point (../api) for complete api documentation. Thanks for visiting Volvme :)",
			suggestion: "Visit /signup to create a new user with us! :)"
		});
};

exports = User.methods.signup = function(req, res) {

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
    })
};

exports = User.methods.login = function(req, res) {

	User.findOne(
		//Query
		{email: req.body.email, password: req.body.password},
		//return values
		{name: true},
		//callback function
		(err, user) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json(user)
		}
	); 
};