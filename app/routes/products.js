var products = require('../controllers/products');

module.exports = function(app) {
	app.get('/products', products.showProducts);
	app.get('/products/:id', products.showProduct);
	
	app.post('/products/post', products.addProduct);
};