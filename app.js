var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    http = require('http'),
    passport = require('passport'),
    app = express(),
    session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//port setup
app.set('port', process.env.PORT || 3000);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: "mySecret", saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));
//passport
app.use(passport.initialize());
app.use(passport.session());
//routes:
require('./routes.js')(app, express, passport);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Mongoose and MongoDB connection
var uriString =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/herestosatruday';

mongoose.connect(uriString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//TODO: Kind of a dirty user insertion here, can be removed once the user is in.
db.once('open', function (callback) {
  console.log("Database connection opened :)");
  console.log("Working in" + app.get('env'));
  if (app.get('env') === 'development') {
    var User = require('./models/user.js');
    User.findOne({username: 'test2'}, function(err, user) {
      if(user != null) {
        console.log("Test user exists.");
      } else {
        console.log("inserting a user: log in with username: test1 password: password");
        User.register(new User({ username : 'test2' }), 'password', function(err, user) {
          if (err) {
            return console.error(err);
          } else {
            res.redirect('/');
          }
        });
      }
    });
  }
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log( 'Home started in ' + app.get('env') +
    ' mode on ' + app.get('port'));
});
