var User = require('mongoose').model('User');

exports.getUsers = function(req, res) {
	User.find({}, function(err, data) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(data);
		}
	});
};

exports.login = function(req, res) {
	console.log(req.body.username);
	console.log(req.body.password);
	User.find({username: req.body.username}, function(err, data) {
		if (err) return res.send(err);

		if (data[0].password === req.body.password) {
			res.send('login successful');
		}
		else {
			res.send('login failed');
			// res.redirect('/login');
		}
	});
};

exports.register = function(req, res) {
	var firstName      = req.body.firstName,
		  lastName       = req.body.lastName,
		  email          = req.body.email,
		  username       = req.body.username,
		  password       = req.body.password,
		  passwordRetype = req.body.passwordRetype;

	if (password == passwordRetype) {
		var newUser = new User({
			firstName : firstName,
			lastName  : lastName,
			username  : username,
			password  : password,
			email     : email
		});

		newUser.save(function(err) {
			if (err) {
				res.send(err);
			}
			else {
				res.send('sucess');
			}
		});
	}
	else {
		res.redirect('/registeration');
	}

};