const express = require('express');
const path = require('path');
const router = express.Router();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, useCreateIndex: true});
const app = express();

//Register middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Register routes
app.use('/', indexRouter);
app.use('/user', userRouter);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
