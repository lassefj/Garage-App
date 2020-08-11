var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    shortcode: String
});

module.exports = mongoose.model('Product', productSchema);