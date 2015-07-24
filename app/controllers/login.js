var User = require('mongoose').model('Product');

exports.login = function(req, res) {
	User.find({userName: req.body.username}, function(err, data) {
		if (err) return res.send(err);

		if (data.password === req.body.username) {
			res.send('login successful');
		}
		else {
			res.send('login failed');
			// res.redirect('/login');
		}
	});
}