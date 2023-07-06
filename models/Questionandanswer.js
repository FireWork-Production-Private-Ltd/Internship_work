const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const QuestionandanswerSchema = new Schema({
    userid: {
        type: ObjectId
    },
    productid: {
        type: ObjectId
    },
    question: {
        type: String
    },
    answer: {
        type: String
    }
}, { timestamps: true })

module.exports = Questionandanswer = mongoose.model('QuestionandanswerSchema', QuestionandanswerSchema)