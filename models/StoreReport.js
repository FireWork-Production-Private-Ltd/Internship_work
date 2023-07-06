const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const StoreReportSchema = new Schema({
    userid: {
        type: ObjectId
    },
    productid: {
        type: ObjectId
    },
    description: {
        type: String
    }
}, { timestamps: true })

module.exports = StoreReport = mongoose.model('StoreReportSchema', StoreReportSchema)