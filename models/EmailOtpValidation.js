const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmailOtpValidationSchema = new Schema({
    email:{
        type:String
    },
    otp:{
        type:Number
    }
},{timestamps:true})

module.exports = EmailOtpValidation = mongoose.model("EmailOtpValidation",EmailOtpValidationSchema)