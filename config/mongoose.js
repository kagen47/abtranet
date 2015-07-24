var config = require('./config');
var mongoose = require('mongoose');
// var elasticsearch = require('elasticsearch');

module.exports = function() {
	var db;
	if (config.debug) {
		var env = require('./env/dev');
		db = mongoose.connect(env.db, function(err, res) {
			if (err) {
				console.log('ERROR connecting to: ' + env.db + '. ' + err);
			}
			else {
				console.log('Succeeded connected to: ' + env.db);
			}
		});

		// var client = new elasticsearch.Client({
		// 	host: 'localhost:27017',
		// 	log: 'trace'
		// });

		console.log("Connected to database: "+ env.db);
	}
	else {
		// if not debugging connect to some database
	}

	require('../app/models/product');
}