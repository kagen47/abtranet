var Product = require('mongoose').model('Product');

exports.getProducts = function(req, res) {
	Product.find({}, fields).exec(function(err, data){
		if (err) return res.send(err);
	
		res.json(data);
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

// ------------------------------------------------------------------------------------------
//   display methods
// ------------------------------------------------------------------------------------------
exports.showProducts = function(req, res) {
	Product.find({}, '_id model price img', function(err, data) {
		if (err) return res.send(err);

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
	res.redirect('/products/search/' + req.body.category + '/' + req.body.search);
};

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