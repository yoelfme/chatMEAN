var express = require('express');
var router = express.Router();

/* Routes get of home */
router.get('/', function  (req, res, next) {
	res.render('login',{
		title:'Home'
	});
});

router.get('/register', function (req, res, next) {
	res.render('register',{
		title:'Register'
	});
});

/* Routes post of home */
route.post('/register', function (req, res, next) {
	var input = req.body;

	var newUser = new db.User(input);
	newUser.save(function (error, user) {
		if (error) {
			res.json(error)
		};

		res.redirect('/login');
	});
})




module.exports = router;