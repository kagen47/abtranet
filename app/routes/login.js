var login = require('../controllers/login');

module.exports = function(app) {
	app.get('/login', function(req, res) {
		res.render('login/index');
	});

	app.post('/login', login.login);
};