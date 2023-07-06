const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const SubscriptionSchema = new Schema({
    planname:{
        type:String
    },
    amount:{
        type:Number
    },
    sellerid:{
        type:ObjectId
    }
},{timestamps:true})

module.exports = Subscription = mongoose.model("Subscription",SubscriptionSchema)