require('dotenv').config();
var express = require('express');
var app = express();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require("passport-local")
var User = require('./models/user')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customer');
var carsRouter = require('./routes/car');
var carCommentsRouter = require('./routes/carComments');
var customerCommentsRouter = require('./routes/customerComments');

const { url } = require('inspector');
const { urlencoded } = require('body-parser');

mongoose.connect(process.env.DB_HOST + 'garageDB', { useNewUrlParser: true, useUnifiedTopology: true }, function () {
  console.log('Mongoose is connected!');
});

// PASSPORT SETUP
app.use(require('express-session')({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// FILL IN TITLE IF NEEDED
app.use(function (req, res, next) {
  res.locals.title = 'GarageApp';
  res.locals.currentUser = req.user;
  next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);
app.use('/customers/:id/comments', customerCommentsRouter);
app.use('/cars', carsRouter);
app.use('/cars/:carid/comments', carCommentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(3000, function () {
  console.log('Succes');
})

module.exports = app;
