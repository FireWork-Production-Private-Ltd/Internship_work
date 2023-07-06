const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReferenceNumberSchema = new Schema({
    referencenumber:{
        type:Number,
        default:null
    }
})

module.exports = ReferenceNumber = mongoose.model('ReferenceNumber',ReferenceNumberSchema)