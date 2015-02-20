var express = require('express');
var router = express.Router();

/* GET hombre page */
router.get('/', function  (req, res, next) {
	res.render('home');
})

module.exports = router;