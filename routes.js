var content = require('./controllers/contentController.js'),
    admin = require('./controllers/adminController.js'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/user.js');

module.exports = function(app, express, passport) {
  admin.passportSetup(passport);

  app.get('/', content.index, app);
  app.get('/about', content.about);
  app.get('/login', admin.login);
  app.get('/dashboard',
          admin.isLoggedIn,
          admin.upload);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));
};
