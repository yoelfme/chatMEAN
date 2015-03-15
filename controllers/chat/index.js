var express = require('express');
var router = express.Router();


/* Middleware - Filters */
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}


router.get('/', restrict, function (req, res, next) {
	res.render('chat',{
		title:'Chat'
	});
});

module.exports = router;