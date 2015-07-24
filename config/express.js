var config = require('./config');

var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
//var methodOverride = require('method-override');

module.exports = function() {
	var app = express();

	// if in development
	if (config.debug) {
		app.use(morgan('dev'));
	}
	else {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(cookieParser());
	// app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'foo'
	}));

	app.set('views', __dirname + '/../app/views');
	app.set('view engine', 'jade');

	var engines = require('consolidate');
	app.engine('html', engines.handlebars);

	require('../app/routes/index')(app);
	require('../app/routes/login')(app);
	
	require('../app/routes/payment')(app);
	require('../app/routes/cart')(app);
	require('../app/routes/search')(app);
	require('../app/routes/products')(app);

	app.use(express.static('./public'));
	
	app.get(/.+/, function(req, res) {
		res.redirect('/404');
	});

	return app;
};