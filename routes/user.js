const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, autoIndex: true });

//User Model
const User = require('../Models/User');
//Routes
router.get('/', function (req, res){
	res.json({
			info: "This is the Volvme api user index point. Refer to the Volvme api index point (../api) for complete api documentation. Thanks for visiting Volvme :)",
			suggestion: "Visit /signup to create a new user with us! :)"
		});
});

router.post('/signup', function (req, res, next){

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
