var express = require('express');
var router = express.Router({ mergeParams: true });
var Order = require('../models/order');
var Car = require('../models/car');
const { model } = require('../models/order');


// CREATE NEW ORDER
router.get('/new', function (req, res) {

    Order.findOne().sort({ createdAt: -1 }).exec(function (err, order) {
        if (err) {
            console.log(err);
        } else {
            order.id++
            res.render('orders/new', {
                order: order
            });
        }
    })
});

// SAVE NEW ORDER
router.post('/', function (req, res) {
    console.log(req.body.newOrder);
    Order.create(req.body.newOrder, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            console.log('---------------');
            console.log(req.body.newOrder);
            res.render('orders/index', {
                order: order
            });
        }
    })
});

// INDEX PAGE

var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

router.get('/', function (req, res) {
    Order.find({}, function (err, order) {
        console.log('---------- DATE--------');
        console.log(order[0].createdAt.toLocaleDateString('en-US', options));
        res.render('orders/index', {
            order: order,
            noMatch: null,
            options: options
        })
    })
})

router.get('/:orderId', function (req, res) {

    Order.findById(req.params.orderId, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            res.render('orders/show', { order: order })
        }
    })

})

module.exports = router