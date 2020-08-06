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
                    res.redirect('/cars/' + req.params.carid);
                }
            })
        }
    })
})

router.delete('/:commentid', function (req, res) {
    CarComment.findByIdAndDelete(req.params.commentid, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('back')
        }
    })
})

router.get('/:commentid/edit', function (req, res) {

    CarComment.findById(req.params.commentid, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.params);
            res.render('carComments/edit', {
                params: req.params,
                comment: comment
            })
        }
    })


})

router.put('/:commentid', function (req, res) {

    CarComment.findByIdAndUpdate(req.params.commentid, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/cars/' + req.params.carid)
        }
    })

})


module.exports = router;
