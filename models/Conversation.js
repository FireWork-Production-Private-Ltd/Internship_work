const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({

    country: {
        type: String,
        default: null
    },
    currencyname: {
        type: String,
        default: null
    },
    currencyvalue: {
        type: Number,
        default: null
    }

}, { timestamps: true })

module.exports = Conversation = mongoose.model('Conversation', ConversationSchema);