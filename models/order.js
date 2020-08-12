var mongoose = require('mongoose')
var AutoIncrement = require('mongoose-sequence')(mongoose);

var orderSchema = new mongoose.Schema({
    date: String,
    createdAt: { type: Date, default: Date.now },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }
})

orderSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Order', orderSchema);