const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AuctionListingSchema = new Schema({
    productid:{
        type:ObjectId,
    },
    sellerid:{
        type:ObjectId,
    },
    maxbuyertojoin:{
        type:Number,
        default:10,
    },
    isactive:{
        type:Boolean,
        default:false
    },
    lowestSellingPrice:{
        type:Number
    },
    basePrice:{
        type:Number
    },
    currentBidPrice:{
        type:Number
    },
    highestBidPrice:{
        type:Number
    }
},{timestamps:true});

module.exports = AuctionListing = mongoose.model("AuctionListing",AuctionListingSchema);