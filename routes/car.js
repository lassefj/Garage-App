var express = require('express');
var router = express.Router({ mergeParams: true });
var Car = require('../models/car');
var CarComment = require('../models/carComment');
var Customer = require('../models/customer');
const { route } = require('.');
const { isLoggedIn } = require('../middleware');


// INDEX PAGE
router.get('/', (req, res) => {

    const noMatch = null

    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const prop = req.query.drop.toLowerCase();
        const search = { [prop]: regex }
        Car.find(search)
            .populate('owner')
            .exec((err, car) => {
                if (err) {
                    console.log(err);
                } else {
                    if (car.length < 1) {
                        noMatch = 'No customer match that query, please try again.'
                    }
                    res.render('cars/index', { car: car, noMatch: noMatch })
                }
            })
    } else {
        Car.find({})
            .populate('owner')
            .exec((err, car) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('cars/index', { car: car, noMatch: noMatch })
                }
            })
    }
})


// CREATE NEW CAR PAGE
router.get('/new', (req, res) => {
    if (req.query.customer) {
        var data = req.query.customer
    } else {
        var data = ''
    }
    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cars/new',
                {
                    title: 'Create new car',
                    customerId: data
                })
        }
    })
});

// CREATE NEW CAR
router.post('/:customerId', (req, res) => {

    const data = req.body.car;

    Customer.findById(req.params.customerId, (err, customer) => {
        if (err) {
            console.log(err);
        } else {
            Car.create(data, async (err, car) => {
                if (err) {
                    console.log(err);
                } else {
                    car.owner = customer._id
                    await car.save()
                    await customer.cars.push(car);
                    await customer.save();
                    res.redirect('/customers/' + customer._id)
                }
            })
        }
    })
});

// SHOW CAR
router.get('/:carid', (req, res) => {
    Car.findById(req.params.carid)
        .populate('comments')
        .populate('owner')
        .populate('orders')
        .exec((err, car) => {
            if (err) {
                console.log(err);
            } else {
                res.render('cars/show', {
                    title: 'Show car',
                    car: car
                });
            }
        })
})

// EDIT CAR PAGE
router.get('/:carid/edit', (req, res) => {
    Car.findById(req.params.carid, (err, car) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cars/edit', {
                car: car
            });
        }
    });
});

// UPDATE CAR
router.put('/:carid', (req, res) => {
    Car.findByIdAndUpdate(req.params.carid, req.body.car, (err, car) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/cars/' + req.params.carid);
        }
    })
})

// DELETE CAR
router.delete('/:carid', (req, res) => {
    Car.findByIdAndDelete(req.params.carid)
        .populate('owner')
        .exec((err, car) => {
            if (err) {
                console.log(err);
            } else {
                console.log(car);
                res.redirect('/customers/' + car.owner._id);
            }
        })
})

// ReqEx function to search the database
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router