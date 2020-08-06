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
                    console.log(err);
                } else {
                    customer.comments.push(comment);
                    customer.save();
                    res.redirect('/customers/' + customer._id)
                }
            })
        }
    })

});

router.delete('/:commentid', function (req, res) {
    CustomerComment.findByIdAndDelete(req.params.commentid, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('back')
        }
    })
})

router.get('/:commentid/edit', function (req, res) {

    CustomerComment.findById(req.params.commentid, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.params);
            res.render('customerComments/edit', {
                params: req.params,
                comment: comment
            })
        }
    })


})

router.put('/:commentid', function (req, res) {

    CustomerComment.findByIdAndUpdate(req.params.commentid, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/customers/' + req.params.id)
        }
    })

})

module.exports = router;