module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});
    app.get('/about', function(req, res) {
        console.log(app.get("views"));
        res.render('about.html');
    });
};