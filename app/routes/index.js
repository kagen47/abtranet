module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index.html');
	});
    app.get('/about', function(req, res) {
        res.render('about.html');
    });
    app.get('/contact', function(req, res) {
        res.render('contact.html');
    });
    app.get('/service', function(req, res) {
        res.render('service.html');
    });
};