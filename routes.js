//controllers
// var resume = require('./controllers/resumeController.js');
// var blog = require('./controllers/blogController.js');
var content = require('./controllers/contentController.js');
var admin = require('./controllers/adminController.js');

module.exports = function(app, express, passport) {
  app.get('/', content.index, app);
  app.get('/about', content.about);
  app.get('/login', admin.login)
  app.get('/dashboard', isLoggedIn, admin.upload)

  function isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
};
