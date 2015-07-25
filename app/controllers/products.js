var Product = require('mongoose').model('Product');
var async = require('async');

exports.getProducts = function(req, res) {
	Product.find({}, function(err, data){
		if (err) {
			res.send(err);
		}
		else {
			res.json(data);
		}
	});
};

exports.addProduct = function(req, res) {
	var product = new Product(req.body);
	product.save(function(err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send({message: "Product saved successfully"});
		}
	});
};

exports.removeProduct = function(req, res) {
	console.log('in remove');
	Product.remove({_id:req.params.id}, function(err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send({message: "Product removed successfully"});
		}
	});
};

// ------------------------------------------------------------------------------------------
//   display methods
// ------------------------------------------------------------------------------------------
exports.showProducts = function(req, res) {
	// Get all the manufacturers
	// Product.aggregate(
	// 	{ $group: {_id: '$manufacturer'}},
	// 	{ $project: {_id: 1}},
	// 	function(err, data) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		else {
	// 			var manufacturers = data;
	// 			Product.find({}, '_id manufacturer img', function(err, data) {
	// 				if (err) {
	// 					console.log(err);
	// 				}
	// 				else {
	// 					console.log(manufacturers);
	// 					console.log(data);
	// 					res.render('products/index', {
	// 						manufacturers: manufacturers,
	// 						products: data
	// 					});
	// 				}
	// 			});
	// 		}
	// 	}
	// );
	Product.find({}, '_id manufacturer img', function(err, data) {
		if (err) {
			console.log(err);
			res.redirect('/404');
		}
		res.render('products/index', {
			products: data
		});
	});
};

exports.showProduct = function(req, res) {
	Product.find({_id: req.params.id}, function(err, data) {
		if (err) return res.send(err);

		// check if product is in shopping cart
		if (req.cookies.cart != undefined) {
			var cart = req.cookies.cart.split('-');
			var inCart = false;
			for (i in cart) {
				if (cart[i] == req.params.id) {
					inCart = true;
					break;
				}
			}
		}
		console.log(data);

		res.render('products/product', {
			product: data,
			inCart: inCart
		});
	});
};

exports.search = function(req, res) {
	res.redirect('/products/search/' + req.body.search);
};

exports.showSearchResult = function(req, res) {
	// var searchWords = req.body.searchWord.split(' ');

	// async.each(searchWords, function(id, callback) {
	// 	Product.find({_id:id}).exec(function(err, data) {
	// 		if (err) return res.send(err);

	// 		products.push(data[0]);
	// 		callback();
	// 	});
	// }, function(err) {
	// 	if (err) return res.send(err);
	// 	res.render('products/cart', {
	// 		subtotal: cart[0],
	// 		products: products
	// 	});
	// });
}

exports.showModelSearchResult = function(req, res) {
	Product.find({
		model: new RegExp(req.params.search, 'i')
	}, function(err, data) {
		if (err) return res.send(err);

		res.render('products/search', {
			searchCategory: 'model',
			searchWord: req.params.search,
			products: data
		});
	});
};

exports.showManufacturerSearchResult = function(req, res) {
	Product.find({
		manufacturer: new RegExp(req.params.search, 'i')
	}, function(err, data) {
		if (err) return res.send(err);

		res.render('products/search', {
			searchCategory: 'manufacturer',
			searchWord: req.params.search,
			products: data
		});
	});
};