var express = require('express');
var router = express.Router({ mergeParams: true });
var CustomerComment = require('../models/customerComment');
var Customer = require('../models/customer');

router.post('/', (req, res, next) => {

    var data = {
        text: req.body.text
    };
    console.log(data);
    console.log('---------------------------');

    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
        } else {
            CustomerComment.create(data, (err, comment) => {
                if (err) {
                    console.log('FEJL2');
                    console.log(err);
                } else {
                    console.log('NEW COMMENT ADDED TO CUSTOMER');
                    console.log(customer);
                    console.log('----------------------');
                    customer.comments.push(comment);
                    customer.save();
                    res.redirect('/customers/' + customer._id)
                }
            })
        }
    })

});


module.exports = router;