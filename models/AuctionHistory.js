const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const AuctionHistorySchema = new Schema({
    auctionid:{
        type:ObjectId,
    },
    sellerid:{
        type:ObjectId
    }
},{timestamps:true})

module.exports = AuctionHistory = mongoose.model('AuctionHistory',AuctionHistorySchema);