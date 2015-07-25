var mail = require('../controllers/mail');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index.html');
	});

  app.get('/about', function(req, res) {
    res.render('about.html');
  });
  
  app.route('/contact')
    .get(function(req, res) {res.render('contact.html');})
    .post(mail.contact);

  app.get('/service', function(req, res) {
    res.render('service.html');
  });

  app.get('/404', function(req, res) {
    res.render('404.html');
  });
};