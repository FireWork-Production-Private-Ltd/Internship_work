const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type:String,
        required : true,
        unique:true
    },
    name:{
        type:String,
        default:null
    },
    phoneNumber:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:null
    },
    city:{
        type:String,
        default:null
    },
    state:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null
    },
    isBuyer:{
        type:Boolean,
        default:false
        
    },
    isSeller:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    hash:{
        type:String
    },
    password:{
        type:String
    },
    gst:{
        type:String
    }
},{timestamps:true})

module.exports = User = mongoose.model('User',UserSchema)