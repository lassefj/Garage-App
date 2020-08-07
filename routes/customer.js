var express = require('express');
var router = express.Router({ mergeParams: true });
var Customer = require('../models/customer')
var CustomerComment = require('../models/customerComment')


/* GET CUSTOMER index page. */
router.get('/', function (req, res, next) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    var noMatch = null;
    var prop = req.query.drop.toLowerCase();
    var search = { [prop]: regex }
    console.log('////////----------/////////');
    console.log(search);
    if (req.query.search) {

        Customer.find(search, (err, allCustomers) => {
            if (err) {
                console.log(err);
            } else {
                if (allCustomers.length < 1) {
                    noMatch = 'No customer match that query, please try again.';
                }
                res.render('customers/index', { title: 'Customers', allCustomers: allCustomers, currentUser: req.user, noMatch: noMatch })
            }
        });
    } else {
        Customer.find({}, function (err, allCustomers) {
            if (err) {
                console.log(err);
            } else {

                res.render('customers/index', { title: 'Customers', allCustomers: allCustomers, currentUser: req.user, noMatch: noMatch })
            }
        })
    }



});

/* GET NEW CUSTOMER page. */
router.get('/new', function (req, res, next) {

    res.render('customers/new', { title: 'New customer' });

});


/* POST NEW CUSTOMER */
router.post('/', (req, res, next) => {

    var data = req.body.customer;
    console.log(data);
    console.log(req.body);

    Customer.create(data, function (err, customer) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('customers')
        }
    });

});



/* SHOW CUSTOMER */

router.get('/:id', function (req, res, next) {

    Customer.findById(req.params.id).populate('comments').populate('cars').exec((err, customer) => {
        if (err) {
            console.log(err);
        } else {
            res.render('customers/show', { title: 'Customer: ' + customer.name, foundCustomer: customer })
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;