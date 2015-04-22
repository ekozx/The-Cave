var content = require('./controllers/contentController.js'),
    admin = require('./controllers/adminController.js');

module.exports = function(app, express, passport) {
  admin.passportSetup(passport);

  //HTTP GET
  app.get('/', content.index, app);
  app.get('/about', content.about);
  app.get('/login', admin.login);
  app.get('/dashboard',
          admin.isLoggedIn,
          admin.upload);
  //HTTP POST
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));
};
