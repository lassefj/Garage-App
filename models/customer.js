var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    zip: String,
    city: String,
    description: String,
    cars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CustomerComment'
        }
    ]
});

module.exports = mongoose.model('Customer', customerSchema);