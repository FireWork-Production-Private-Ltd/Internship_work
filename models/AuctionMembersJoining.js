const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AuctionMembersJoiningSchema = new Schema({
    auctionid: {
        type: ObjectId,
    },
    maxmemberjoin: {
        type: Number
    },
    members: [{
        buyerid: {
            type: ObjectId
        }
    }]
},{timestamps:true})

module.exports = AuctionMembersJoining = mongoose.model('AuctionMembersJoining',AuctionMembersJoiningSchema)