var Product = require('mongoose').model('Product');
var async = require('async');

exports.showCart = function(req, res) {
	if (req.cookies.cart != undefined) {
		// Create string array of product id in cart
		// remove subtotal from cart
		var cart = req.cookies.cart.split('-');
		var idInCart = [];
		var length = cart.length;
		for (var i = 1; i < length; i++) {
			idInCart[i-1] = cart[i];
		}

		// create json object with all the products in cart
		var products = [];
		async.each(idInCart, function(id, callback) {
			Product.find({_id:id}).exec(function(err, data) {
				if (err) return res.send(err);

				products.push(data[0]);
				callback();
			});
		}, function(err) {
			if (err) return res.send(err);
			res.render('products/cart', {
				subtotal: cart[0],
				products: products
			});
		});
	}
	else {
		res.render('products/cart', {
			subtotal: 0,
			products: []
		})
	}
};

exports.addToCart = function(req, res) {
	var newCart;

	// update subtotal of cart
	Product.find({_id: req.params.id}, 'price', function(err, data) {
		if (err) return res.send(err);

		if (req.cookies.cart == undefined) {
			newCart = data[0].price;
		}
		else {
			var cart = req.cookies.cart.split('-');
			for (i in cart) {
				if (i != 0) {
					newCart += '-' + cart[i];
				}
				else {
					newCart = parseInt(cart[0]) + data[0].price;
				}
			}
		}

		newCart += '-' + req.params.id;

		res.cookie('cart', newCart);
		res.redirect('/products/cart');
	});
};

exports.removeFromCart = function(req, res) {
	var cart = req.cookies.cart.split('-');
	var idInCart = [];
	var length = cart.length;
	for (var i = 1; i < length; i++) {
		idInCart[i-1] = cart[i];
	}
	var newCart;

	// update subtotal of cart
	Product.find({_id: req.params.id}, 'price', function(err, data) {
		if (err) return res.send(err);

		newCart = parseInt(cart[0]) - data[0].price;

		var removeIndexFound = false;
		for (i in idInCart) {
			if (!removeIndexFound && idInCart[i] == req.params.id) {
				removeIndexFound = true;
			}
			else {
				newCart += '-' + idInCart[i];
			}
		}
		
		if (newCart == 0) {
			res.clearCookie('cart');
		}
		else {
			res.cookie('cart', newCart);
		}
		res.redirect('/products/cart');
	});
};

exports.clearCart = function(req, res) {
	res.clearCookie('cart');
};