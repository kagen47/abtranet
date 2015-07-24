var payment = require('../controllers/payment');

module.exports = function(app) {
	app.get('/products/payment', payment.showForm);
	app.post('/products/payment', payment.pay);
};