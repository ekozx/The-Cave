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
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
