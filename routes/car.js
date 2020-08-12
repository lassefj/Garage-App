var express = require('express');
var router = express.Router({ mergeParams: true });
var Car = require('../models/car');
var CarComment = require('../models/carComment');
var Customer = require('../models/customer');
const { route } = require('.');
const { isLoggedIn } = require('../middleware');


// INDEX PAGE
router.get('/', function (req, res) {
    var noMatch = null
    if (req.query.search) {

        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        var prop = req.query.drop.toLowerCase();
        var search = { [prop]: regex }
        console.log(search);
        Car.find(search).populate('owner').exec(function (err, car) {
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
        Car.find({}).populate('owner').exec(function (err, car) {
            if (err) {
                console.log(err);
            } else {
                res.render('cars/index', { car: car, noMatch: noMatch })
            }
        })
    }


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

    var data = req.body.car;
    var customerId = req.query.customer
    console.log('------------------');
    console.log(req.params.customerId);

    Customer.findById(req.params.customerId, (err, customer) => {
        if (err) {
            console.log(err);
        } else {
            console.log('--------CUSTOMER INFO----------');
            console.log(customer);
            Car.create(data, async (err, car) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('---------INFO 2---------');
                    console.log(customer);
                    console.log(car);
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router