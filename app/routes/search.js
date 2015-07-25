var products = require('../controllers/products');

module.exports = function(app) {
	app.post('/products/search', products.search);
    app.get('/products/search/:searchWord', products.showModelSearchResult);
	app.get('/products/search/model/:search', products.showModelSearchResult);
	app.get('/products/search/manufacturer/:search', products.showManufacturerSearchResult);
}