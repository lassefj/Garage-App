var express = require('express');
var router = express.Router();
var Customer = require('../models/customer')


/* GET CUSTOMER index page. */
router.get('/', function (req, res, next) {

    Customer.find({}, (err, allCustomers) => {
        if (err) {
            console.log(err);
        } else {
            res.render('customers/index', { title: 'Customers', allCustomers: allCustomers })
        }
    });


});

/* GET NEW CUSTOMER page. */
router.get('/new', function (req, res, next) {

    res.render('customers/new', { title: 'New customer' });

});


/* POST NEW CUSTOMER */
router.post('/', (req, res, next) => {

    var data = req.body.customer;

    CustomerComment.create(data, function (err, customer) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('customers')
        }
    });

});



/* SHOW CUSTOMER */

router.get('/:id', function (req, res, next) {

    Customer.findById(req.params.id).populate('comments').populate('cars').exec((err, foundCustomer) => {
        if (err) {
            console.log(err);
        } else {
            res.render('customers/show', { title: 'Customer: ' + foundCustomer.name, foundCustomer: foundCustomer })
        }
    })


});

/* DELETE CUSTOMER */

router.delete('/:id', (req, res) => {

    Customer.findByIdAndRemove(req.params.id, (err) => {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/customers')
        }

    })

})


/* Get UPDATE CUSTOMER page */

router.get('/:id/edit', (req, res) => {

    Customer.findById(req.params.id, (err, foundCustomer) => {
        if (err) {
            console.log(err);
        } else {
            res.render('customers/edit', { title: 'Edit customer: ' + foundCustomer.name, foundCustomer: foundCustomer })
        }
    })
});

/* UPDATE CUSTOMER */

router.put('/:id', (req, res) => {

    var data = req.body.customer;

    Customer.findByIdAndUpdate(req.params.id, data, (err, updatedCustomer) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/customers')
        }
    })
})

module.exports = router;