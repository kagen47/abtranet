var express = require('./config/express');
var mongoose = require('./config/mongoose');
var paypal = require('./config/paypal');

var db = mongoose();
var app = express();
var pp = paypal();

app.listen(3000);

module.exports = app;

console.log("server is listening on port 3000");