var mongoose = require('mongoose');

var carCommentSchema = new mongoose.Schema({
    text: String
});


module.exports = mongoose.model('CarComment', carCommentSchema);