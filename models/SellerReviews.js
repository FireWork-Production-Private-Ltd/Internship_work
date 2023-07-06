const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const SellerReviewSchema = new Schema({
    buyerid: {
        type: ObjectId,
    },
    sellerid: {
        type: ObjectId,
    },
    rating: {
        type: Number,
        enum:[1,2,3,4,5]
    },
    review: {
        type: String,
    }

},{timestamps:true})

module.exports = SellerReviews = mongoose.model('SellerReviews', SellerReviewSchema);