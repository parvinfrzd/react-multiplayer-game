var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
if (process.env.NODE_ENV === 'production' || process.env.PREVIEW === 'true'){
  app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'build')));
}

app.use(logger('dev'));
app.use(express.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
console.log(`Express app running on port ${port}`)
});
