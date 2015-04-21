var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user.js');

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
exports.attemptLogIn = function (passport) {
  // var User = require('../models/user.js');
  // var LocalStrategy = require('passport-local').Strategy;
  // console.log("passport");
  // passport.use(new LocalStrategy(User.authenticate()));
  // passport.serializeUser(User.serializeUser());
  // passport.deserializeUser(User.deserializeUser());
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
