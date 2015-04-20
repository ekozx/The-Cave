exports.login = function(req, res) {
  res.render('login');
};
exports.new = function(req, res) {
  res.render('new');
};
exports.upload = function(req, res) {

}
// Generating users is no longer neccessary.
exports.register = function(req, res) {
  res.render('register');
};
exports.createUser = function(req, res) {
  var User = require('../models/user.js');
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};
