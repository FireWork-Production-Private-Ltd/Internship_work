const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OrderedHistorySchema = new Schema({
    userid:{
        type:ObjectId
    },
    orderedinfo:[{
        orderedreferencenumber:{
            type:String
        }
    }]
},{timestamps:true})

module.exports = OrderedHistory = mongoose.model('OrderedHistory',OrderedHistorySchema)