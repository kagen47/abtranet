var User = require('mongoose').model('Product');

exports.login = function(req, res) {
	User.find({userName: req.body.username}, function(err, data) {
		if (err) return res.send(err);

		if (data.password == req.body.username) {
			res.send('login successful');
		}
		else {
			res.send('login failed');
			// res.redirect('/login');
		}
	});
};

exports.register = function(req, res) {
	var firstName = req.body.firstName,
		lastName  = req.body.lastName,
		email     = req.body.email,
		username  = req.body.username,
		password  = req.body.password;

	var newUser = new User({
		firstName : firstName,
		lastName  : lastName,
		username  : username,
		password  : password,
		email     : email
	});

	User.save(function(err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send('sucess');
		}
	})
};