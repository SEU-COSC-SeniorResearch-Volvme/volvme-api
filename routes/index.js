var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
	welcome: '~Welcome to the Volvme api~',
	enpoints: { post: 
		{ signup: 'name,email,password => new_user',
		  login: 'email,password => user,name'}
		}
	});
});

module.exports = router;