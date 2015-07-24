var paypal = require('paypal-rest-sdk');
var cart = require('./cart');

exports.showForm = function(req, res) {
	res.render('products/payment', {});
};

exports.pay =  function(req, res) {
	// Read the incoming product data
	var ccNum = req.param('ccNum');
	var firstName = req.param('firstName');
	var lastName = req.param('lastName');
	var expMonth = req.param('expMonth');
	var expYear = req.param('expYear');
	var cvv = req.param('cvv');
	// billing address
	var street = req.param('street');
	var city = req.param('city');
	var state = req.param('state');
	var postalCode = req.param('postalCode');
	var country = req.param('country');

	// Read the payment information to pass to the PayPal library
	var payment = {
		'intent': 'sale',
		'payer': {
			'payment_method': 'credit_card',
			'funding_instruments': []
		},
		'transactions': []
	};

	// Identify credit card type.  Patent pending. 
	// Credit cards starting with 3 = amex, 4 = visa, 5 = mc, 6 = discover
	var ccType = (['amex', 'visa', 'mastercard', 'discover'])[parseInt(ccNum.slice(0,1),10)-3];

	// Set the credit card
	payment.payer.funding_instruments[0] = {
		'credit_card': {
			'number': ccNum,
			'type': ccType,
			'expire_month': expMonth,
			'expire_year': expYear,
			'cvv2': cvv,
			'first_name': firstName,
			'last_name': lastName,
			'billing_address': {
				'line1': street,
				'city': city,
				'state': state,
				'postal_code': postalCode,
				'country_code': country
			}
		}
	};

	// Set the total to charge the customer
	payment.transactions[0] = {
		amount: {
			total: req.cookies.cart.split('-')[0],
			currency: 'USD'
		},
		description: 'Your Kraken Store Purchase'
	};


	// Execute the payment
	paypal.payment.create(payment, {}, function(err, resp) {
		if (err) return res.send(err);

		if (resp) {
			res.clearCookie('cart');
			res.send('success');
		}
	});
};