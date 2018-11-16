const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, autoIndex: false});
const User = require('../Models/User');
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser');


module.exports = {

	get: function(id, )
}
// User.index =  function(req,res){
// 		res.json({
// 			info: "This is the Volvme api user index point. Refer to the Volvme api index point (../api) for complete api documentation. Thanks for visiting Volvme :)",
// 			suggestion: "Visit /signup to create a new user with us! :)"
// 		})
// 	};

// User.signup = function (req, res, next){
// 	const new_id = mongoose.Types.ObjectId();
// 	const new_user = new User({
// 		_id: new_id,
// 		name: req.body.name,
// 		email: req.body.email,
// 		password: req.body.password
// 	})
// 	new_user.save(function(err, new_user){
//     	if (err) return next(err);
//     	return res.status(200).json(new_user);
//     })
// };

// User.login = function (req, res, next){
// 	User.findOne(
// 		//Query
// 		{email: req.body.email, password: req.body.password},
// 		//return values
// 		{name: true},
// 		//callback function
// 		(err, user) => {
// 			if (err) return res.status(500).json(err)
// 			return res.status(200).json(user)
// 		}
// 	); 
// };
module.exports = User;