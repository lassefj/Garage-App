var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model('Campground', campgroundSchema);


// Remember to require this file in app.js
// var Campground = require('./models/campground)