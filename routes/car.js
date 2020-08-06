var express = require('express');
var router = express.Router({ mergeParams: true });
var Car = require('../models/car');
var CarComment = require('../models/carComment');
var Customer = require('../models/customer');
const { route } = require('.');
const { isLoggedIn } = require('../middleware');


// INDEX PAGE
router.get('/', function (req, res) {

    Car.find({}).populate('owner').exec(function (err, car) {
        if (err) {
            console.log(err);
        } else {
            console.log('-------NOW HERE------');
            console.log(car);
            res.render('cars/index', { car: car })
        }
    })
})


// NEW CAR PAGE
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
            res.render('cars/new', { title: 'Create new car', customerId: data })
        }
    })


});

// CREATE NEW CAR
router.post('/:customerId', (req, res) => {

    console.log('---------------START-------');
    var data = req.body.car;
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
    data.owner = req.params.customerId;
    console.log(data);
    console.log('---------------SLUT-------');

    Customer.findById(req.params.customerId, (err, customer) => {
        if (err) {
            console.log(err);
        } else {
            Car.create(data, (err, car) => {
                if (err) {
                    console.log(err);
                } else {

                    customer.cars.push(car);
                    customer.save();
                    res.redirect('/customers/' + customer._id)
                }
            })
        }
    })

});

// SHOW CAR

router.get('/:carid', (req, res) => {

    Car.findById(req.params.carid).populate('comments').populate('owner').exec((err, car) => {
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

router.get('/:carid/edit', function (req, res) {
    Car.findById(req.params.carid, function (err, car) {
        if (err) {
            console.log(err);
        } else {
            res.render('cars/edit', {
                car: car
            });
        }
    });
});

router.put('/:carid', function (req, res) {
    Car.findByIdAndUpdate(req.params.carid, req.body.car, function (err, car) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/cars/' + req.params.carid);
        }
    })
})




module.exports = router