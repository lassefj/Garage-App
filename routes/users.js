var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// SHOW REGISTER FORM
router.get("/register", function (req, res) {
  res.render("register");
});

//, { title: 'Register new user' }


// REGISTER NEW USER
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      return res.render("register", { title: 'User already exsists' });
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});

// SHOW LOGIN PAGE
router.get("/login", function (req, res) {
  res.render("login", { title: 'Login with your username and password' });
});

// USER LOGIN
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "../",
    failureRedirect: "/users/login"
  }), function (req, res) {
  });

// LOGOUT USER
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// MIDDLEWARE

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/users/login')
  }
};

module.exports = router;
