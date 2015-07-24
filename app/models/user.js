var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName{
		type: String,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		validate: [
			function(password) {
				return password && password.length >6;
			}, 'Password should be greater than six characters'
		]
	},
	email: {
		type: String,
		required: true,
		index: true
	}//,
	// address: {
	// 	street: {
	// 		type: String
	// 	},
	// 	city: {
	// 		type: String
	// 	},
	// 	state: {
	// 		type: String
	// 	},
	// 	postalCode: {
	// 		type: String
	// 	},
	// 	country: {
	// 		type: String
	// 	}
	// }
});

exports = mongoose.model('User', userSchema);