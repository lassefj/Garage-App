var express = require('express')
var router = express.Router({ mergeParams: true });
var Product = require('../models/product')
var { ObjectId } = require('mongodb');

// INDEX PAGE
router.get('/', function (req, res) {

    Product.find({}, function (err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('products/index', {
                product: products,
                noMatch: null
            });
        }
    })
})

// NEW PRODUCT PAGE
router.get('/new', function (req, res) {
    res.render('products/new')
})

// POST PRODUCT
router.post('/', function (req, res) {

    Product.create(req.body.product, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/products')
        }
    })

})

// PRODUCT SHOW PAGE
router.get('/:productId', function (req, res) {

    Product.findById(req.params.productId, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('products/show', {
                product: product,
                noMatch: null
            })
        }
    })

})


module.exports = router