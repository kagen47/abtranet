var products = require('../controllers/products');

module.exports = function(app) {
	app.get('/products', products.showProducts);
	app.get('/products/product-details/:id', products.showProduct);
	
    app.get('/api/products', products.getProducts);
	app.post('/api/products', products.addProduct);
};