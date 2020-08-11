var mongoose = require('mongoose')
var AutoIncrement = require('mongoose-sequence')(mongoose);

var orderSchema = new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
})

orderSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Order', orderSchema);