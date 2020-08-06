var mongoose = require('mongoose');

var customerCommentSchema = new mongoose.Schema({
    text: String,
    postedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CustomerComment', customerCommentSchema);