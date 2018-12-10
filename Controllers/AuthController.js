const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../Models/User');

module.exports.signup = function(req, res) {
  const new_user = new User({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		location: req.body.location
	})
	.setPassword(req.body.password)
	.save(function(err){
    	if (err) return res.status(500).json(err);
    	res.status(200).json({
    		"token": token
    	})
    })
};

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){

    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if(user){
      let token = user.generateJwt();
      res.status(200).json({
      	"token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
