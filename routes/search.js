var express = require('express');
var router = express.Router({ mergeParams: true });
var Car = require('../models/car');
var Customer = require('../models/customer');


router.get('/car', function (req, res) {

    const regex = new RegExp(escapeRegex(req.query.regno), 'gi');
    const search = { regno: regex }

    Car.find(search, function (err, car) {
        if (err) {
            console.log(err);
        } else {
            res.send(car)
        }
    })
})
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router