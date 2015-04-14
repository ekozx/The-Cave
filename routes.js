//controllers
// var resume = require('./controllers/resumeController.js');
// var blog = require('./controllers/blogController.js');
var content = require('./controllers/contentController.js');
// var admin = require('./controllers/adminController.js');

module.exports = function(app, express) {
  // var User = require('./models/user.js');

  // if (app.get('env') === 'development') {
  //   app.get('/register', admin.register);
  //   app.post('/register', admin.createUser);
  // }
  // app.get('/processing', projects.processing)
  app.get('/', content.index, app);
  // app.get('projects', projects.index);
  // app.get('/resume', resume.index);
  // app.get('/blog', blog.index);

  // app.get('/single/:indexTitle', blog.single)
};
