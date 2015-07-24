var express = require('./config/express');
var mongoose = require('./config/mongoose');
var paypal = require('./config/paypal');

var db = mongoose();
var app = express();
var pp = paypal();

var port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;

console.log("server is listening on port 3000");