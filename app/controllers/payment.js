var paypal = require('paypal-rest-sdk');
var cart = require('./cart');

exports.showForm = function(req, res) {
	res.render('products/payment', {});
};

exports.pay =  function(req, res) {
	// Read the incoming product data
	var ccNum = req.body.ccNum;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var expMonth = req.body.expMonth;
	var expYear = req.body.expYear;
	var cvv = req.body.cvv;
	// billing address
	var street = req.body.street;
	var city = req.body.city;
	var state = req.body.state;
	var postalCode = req.body.postalCode;
	var country = req.body.country;

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