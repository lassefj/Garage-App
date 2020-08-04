var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
    name: String,
    make: String,
    model: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarComment'
    }]
});

module.exports = mongoose.model('Car', carSchema);