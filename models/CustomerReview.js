const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerReviewSchema = new Schema({
    userid: {
        type: ObjectId,
    },
    productid: {
        type: ObjectId,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    }

})

module.exports = CustomerReview = mongoose.model('CustomerReview', CustomerReviewSchema);