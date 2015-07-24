var cart = require('../controllers/cart');

module.exports = function(app) {
	app.get('/products/cart', cart.showCart);

	app.post('/products/cart/add/:id', cart.addToCart);
	app.post('/products/cart/remove/:id', cart.removeFromCart);
	app.post('/products/cart/clear', cart.clearCart);
}