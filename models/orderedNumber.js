const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderedNumberSchema = new Schema({
    referencenumber: {
        type: Number,
        default: null
    }
})

module.exports = OrderedNumber = mongoose.model('OrderedNumber', OrderedNumberSchema)