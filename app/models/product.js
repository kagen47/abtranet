var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	partNum: {
		type: String,
		default: "",
		required: true
	},
	model: {
		type: String,
		default: "",
		required: true
	},
	description: {
		type: String,
		default: "",
		required: true
	},
	manufacturer: {
		type: String,
		default: "",
		required: true
	},
	price: {
		type: Number,
		default: 0,
		required: true
	},
	img: {
		type: String
	}
});

exports = mongoose.model('Product', productSchema);