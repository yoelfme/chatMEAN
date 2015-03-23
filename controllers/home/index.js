var express = require('express');
var router = express.Router();
var encrypter = require('./encrypter');

router.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      req.session.regenerate(function(){
        req.session.user = user;
        res.redirect('back');
      });
    } else {
      res.redirect('login');
    }
  });
});

/* Routes get of home */
router.get('/',function (req, res, next) {
	res.redirect('/chat');
})

router.get('/login', function  (req, res, next) {
	res.render('login',{
		title:'Home'
	});
});

router.get('/logout', function (req, res) {
   delete req.session.user_id;
   res.redirect('/login');
});  


router.get('/register', function (req, res, next) {
	res.render('register',{
		title:'Register'
	});
});

/* Routes post of home */
router.post('/register', function (req, res, next) {
	var input = req.body;
	var newUser = new db.User(input);

	encrypter.hash(input.password, function(err, salt, hash) {
	  	if (err) {
	    	console.log(err);
	  	}
	  	// user.salt = salt;
	  	newUser.password = password;
	  	newUser.save(function(err) {
		    if (err) {
		      	console.log(err);
		    } else {
		      	res.redirect('/login');
		    }
	  	});
	});
});

module.exports = router;


// Functions helpers
function authenticate(name, pass, fn) {
  db.User.findOne ({username: name}, function(err, user) {
    if (!user) return fn(new Error('cannot find user'));
    hash(pass, user.salt, function(err, hash){
      if (err) return fn(err);
      if (hash == user.hash) return fn(null, user);
      fn(new Error('invalid password'));
    })
  })
}
