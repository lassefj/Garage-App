var express = require('express');
var router = express.Router({ mergeParams: true });
var Car = require('../models/car');
var CarComment = require('../models/carComment');

// NEW CAR
router.get('/new', (req, res) => {


    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cars/new', { title: 'Create new car', customer: customer })
        }
    })


});

// CREATE NEW CAR
router.post('/', (req, res) => {

    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
        } else {
            Car.create(req.body.car, (err, car) => {
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

    Car.findById(req.params.carid).populate('comments').exec((err, car) => {
        if (err) {
            console.log('---------ERROR---------');
            console.log(err);
        } else {
            console.log('-------------------');
            res.render('cars/show', {
                title: 'Show car',
                car: car,
                param: req.params.id
            });
        }
    })
})




module.exports = router;