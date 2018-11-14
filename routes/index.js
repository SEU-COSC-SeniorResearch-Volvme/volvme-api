var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
	welcome: '~Welcome to the Volvme api~',
	enpoints: {
			user: {
				post: {
					signup: 'name,email,password => new User',
					login: 'email,password => user._id, user.name'
				},
				get: {}	
			} // end of user endpoint
		}
	});
});

module.exports = router;