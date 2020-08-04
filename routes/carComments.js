var express = require('express');
var router = express.Router({ mergeParams: true });
var CarComment = require('../models/carComment');
var Car = require('../models/car');
const { create } = require('../models/customer');

router.post('/', (req, res) => {

    var data = {
        text: req.body.text
    }

    Car.findById(req.params.carid, (err, car) => {
        if (err) {
            console.log(err);
        } else {
            CarComment.create(data, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    car.comments.push(comment);
                    car.save();
                    res.redirect('/customers/' + req.params.id + '/cars/' + req.params.carid + '/');
                }
            })
        }
    })
})



module.exports = router;
