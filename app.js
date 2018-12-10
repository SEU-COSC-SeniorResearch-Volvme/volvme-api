const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, autoIndex: false});
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//Register middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(passport.initialize());

//Register routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
// // Catch unauthorised errors
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({"message" : err.name + ": " + err.message});
//   }
// });
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({message: err.message});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message});
});

module.exports = app;
