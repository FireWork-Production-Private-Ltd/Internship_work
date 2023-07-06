const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const RecentlyViewedSchema = new Schema({
    userid: {
        type: ObjectId
    },
    productid: {
        type: ObjectId
    },
    numberofviews:{
        type:Number,
        default:null
    }

}, { timestamps: true })

RecentlyViewedSchema.index({numberofviews:-1})

module.exports = RecentlyViewed = mongoose.model('RecentlyViewedSchema', RecentlyViewedSchema)