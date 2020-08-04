
var middlewareObj = {};

// CHECK FOR LOGGED-IN USERS
middlewareObj.isLoggedIn = function () {
    app.use(function (req, res, next) {
        res.locals.currentUser = req.user;
        next();
    })
};


module.exports = middlewareObj;