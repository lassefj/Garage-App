const express = require('express');
const router = express.Router({ mergeParams: true });
const Order = require('../models/order');
const Car = require('../models/car');
const { model } = require('../models/order');

// CREATE NEW ORDER
router.get('/new', function (req, res) {
    if (req.query.regno) {
        Car.findOne({ regno: req.query.regno })
            .populate('owner')
            .exec(function (err, car) {
                Order.findOne()
                    .sort({ createdAt: -1 })
                    .exec(function (err, order) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (order) {
                                order.id++
                            }
                            res.render('orders/new', {
                                order: order,
                                car: car
                            });
                        }
                    })
            });
    } else {
        Order.findOne()
            .sort({ createdAt: -1 })
            .exec(function (err, order) {
                if (err) {
                    console.log(err);
                } else {
                    if (order) {
                        order.id++
                    }
                    res.render('orders/new', {
                        order: order,
                        car: null
                    });
                }
            })
    }
});

// SAVE NEW ORDER
router.post('/', function (req, res) {
    Car.findOne({ regno: req.body.newOrder.regno }, function (err, car) {
        if (err) {
            console.log(err);
        } else {
            Order.create(req.body.newOrder, async function (err, order) {
                if (err) {
                    console.log(err);
                } else {
                    order.car = car._id
                    car.orders.push(order)
                    await order.save();
                    await car.save();

                    res.redirect('/orders');
                }
            })
        }
    })
});

// INDEX PAGE
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

router.get('/', function (req, res) {
    Order.find({})
        .populate('car')
        .exec(function (err, order) {
            res.render('orders/index', {
                order: order,
                noMatch: null,
                options: options
            })
        })
})

// SHOW ORDER
router.get('/:orderId', function (req, res) {
    Order.findById(req.params.orderId)
        .populate('car')
        .populate('repair')
        .populate({ path: 'car', populate: { path: 'owner', model: 'Customer' } })
        .exec(function (err, order) {
            if (err) {
                console.log(err);
            } else {
                res.render('orders/show', { order: order })
            }
        })
})

module.exports = router