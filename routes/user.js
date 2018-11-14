const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, createIndex: true});
//Controler
const User = require('../Models/User');
//Routes
router.get('/', User.index);
router.post('/signup', function (req, res, next){
	const new_id = mongoose.Types.ObjectId();
	const new_user = new User({
		_id: new_id,
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	new_user.save(function(err, new_user){
    	if (err) return next(err);
    	return res.status(200).json(new_user);
    })
});
router.post('/login', function (req, res, next){
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
});

module.exports = router;
