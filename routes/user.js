const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, autoIndex: false });

//User Model
const User = require('../Models/User');
//const UserController = require('../Controllers/UserController');
//Routes
router.get('/', function(req, res) {
	res.json({
			info: "This is the Volvme api user index point. Refer to the Volvme api index point (../api) for complete api documentation. Thanks for visiting Volvme :)",
			suggestion: "Visit /signup to create a new user with us! :)"
		});
});
router.post('/signup', function(req, res, next) {

	const new_user = new User({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		location: req.body.location,
		//password: req.body.password
	})
	new_user.setPassword(req.body.password)
	new_user.save(function(err, new_user){
    	if (err) return res.status(500).json(err);
    	let token = new_user.generateJWT();
    	req.session.userID = new_user._id;
    	return res.redirect('profile'); //.send(new_user.toAuthJSON());
    })
});
router.post('/login', function(req, res) {

	User.findOne(
		//Query
		{email: req.body.email, password: req.body.password},
		//callback function
		(err, user) => {
			if (err) return res.status(500).json(err)
			return res.status(200).send(user.toAuthJSON())
		}
	); 
});

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userID)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          const err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.status(200).send(user.toAuthJSON())
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});



module.exports = router;
