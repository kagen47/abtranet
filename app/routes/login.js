var login = require('../controllers/login');

module.exports = function(app) {
	app.get('/login', function(req, res) {
		res.render('login/login.html');
	});

    app.get('/registration', function(req, res) {
        res.render('login/registration.html');
    });

	app.post('/login', login.login);
};