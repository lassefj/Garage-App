var express = require('express');
var router = express.Router({ mergeParams: true });
var Car = require('../models/car');
var Product = require('../models/product');
var Customer = require('../models/customer');


router.get('/car', function (req, res) {

    const regex = new RegExp(escapeRegex(req.query.regno), 'gi');
    const search = { regno: regex }

    Car.find(search).populate('owner').exec(function (err, car) {
        if (err) {
            console.log(err);
        } else {
            res.send(car)
        }
    })
})

router.get('/products', function (req, res) {
    console.log(req.query);
    console.log(req.query.name);
    const regex = new RegExp(escapeRegex(req.query.name), 'gi');
    const search = { name: regex }

    Product.find(search).exec(function (err, product) {
        if (err) {
            console.log(err);
        } else {
            console.log('----------PRODUCT-------');
            console.log(product);
            res.send(product)
        }
    })

})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router