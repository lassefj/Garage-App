var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
    regno: String,
    make: String,
    model: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarComment'
    }]
});

module.exports = mongoose.model('Car', carSchema);