var nodemailer   = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kagendev@gmail.com',
    pass: '10QPalzm'
  }
});


exports.contact = function(req, res) {
  var mailContent = {
    // from : Does not work with gmail
    to      : 'gene.nakagaki@gmail.com',
    subject : 'Abtranet website contact' + req.body.email, 
    text    : req.body.message
  };

  transporter.sendMail(mailContent, function(err, info) {
    if (err) {
      console.log(err);
      res.render('contact.html', {
        title: 'Abtranet website contact',
        msg: 'Error: message not sent',
        err: true,
        page: 'contact'
      });
    }
    else {
      res.render('contact.html', {
        title: 'Abtranet website contact',
        msg: 'Message sent successfully!',
        err: false,
        page: 'contact'
      });
    }
  });   
};

exports.paymentReport = function(message) {
  var mailContent = {
    to: 'gene.nakagaki@gmail.com',
    subject: 'Abtranet website payment report',
    text: message
  };

  transporter.sendMail(mailContent, function(err, info) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Payment report sent successfully');
    }
  });
};