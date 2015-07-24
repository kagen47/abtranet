var user = require('../controllers/user');

module.exports = function(app) {
  app.route('/login')
    .get(function(req, res) {
      res.render('user/login.html');
    })
    .post(user.login);

  app.route('/registration')
    .get(function(req, res) {
      res.render('user/registration.html');
    })
    .post(user.register);

  app.get('/users', user.getUsers);
};