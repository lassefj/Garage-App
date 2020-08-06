var mongoose = require('mongoose');

var carCommentSchema = new mongoose.Schema({
    text: String,
    postedAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('CarComment', carCommentSchema);