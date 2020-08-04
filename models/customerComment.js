var mongoose = require('mongoose');

var customerCommentSchema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model('CustomerComment', customerCommentSchema);