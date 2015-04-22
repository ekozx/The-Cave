var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user.js');

exports.login = function(req, res) {
  res.render('login');
};
exports.new = function(req, res) {
  res.render('new');
};
exports.dashboard = function(req, res) {
  res.render('dashboard');
}
// Generating users shouldn't be neccessary: will delete if they can be added manually
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
//Passport related function: attemptLogIn, passPortSetup, isLoggedIn
exports.attemptLogIn = function (passport) {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  });
};
exports.passportSetup = function(passport) {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}
exports.isLoggedIn = function (req, res, next) {
  console.log("isLoggedIn function");
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
