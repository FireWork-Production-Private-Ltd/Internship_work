const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const BidSystemSchema = new Schema({
    buyerid: {
        type: ObjectId
    },
    productid: {
        type: ObjectId
    },
    bidprice: {
        type: Number,
        default: null
    },
    comment:{
        type:String,
        default:null
    }

}, { timestamps: true })

BidSystemSchema.index({ bidprice: -1 })

module.exports = BidSystem = mongoose.model('BidSystem', BidSystemSchema)