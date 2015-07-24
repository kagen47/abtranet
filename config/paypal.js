var paypal =  require('paypal-rest-sdk');

module.exports = function() {
	paypal.configure({
		'mode': 'sandbox',
		'client_id': 'ATLINJEnpjSZwD4lSs4C3UUkMGWCB-zHOxyoOpu5q6J2MwWv8DOfcgCit-uBfdKfsbO2VJkC2YJp0vR_',
		'client_secret': 'EEjjF92oYUZgHEUegZsPuzX2IqPkDfDpTKk_rEbam7MI_HOh0iUVCav5dNO8hur0B3mhkC7RMCP_I5hp'
	});
};