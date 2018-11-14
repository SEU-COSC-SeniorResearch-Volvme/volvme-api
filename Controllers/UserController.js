const User = require('../Models/User');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, useCreateIndex: true});
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser');



User.index =  function(req,res){
		res.json({
			data: 'User.index'
		})
	};

User.signup = function(req,res,next){

	//User.create(req.body);
	const new_user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	new_user.save(function(err, new_user){
    	if (err) return next(err);
    	return res.status(200).json(new_user);
    })

		// var new_user = User.create({
		// 	username: req.body.username,
		// 	email: req.body.email,
		// 	password: req.body.password
		// }, function(err, new_user){
		// 	if (err) handleError
		// });
		
		// new_user.save(function(err){
		// 	if (!err) res.json({
		// 		new_user
		// 	});
		// });

	};
User.login = function(req,res){

		let username = req.body.username;
		let password = req.body.password;
		User.findOne({
			username: username,
			function(err, user){
				if (!bcrypt.compareSync(password, user.password)){
					res.json({
						status: 0,
						message: err
					});
				} else {
					res.json({
						status: 1,
						message: 'Successful Login'
					});
				}
			}
		});
	};
module.exports = User;