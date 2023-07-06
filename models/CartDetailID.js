const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartDetailIDSchema = new Schema({
    cartdetailid:{
        type:Number,
        default:null
    }
})

module.exports = CartDetailID = mongoose.model('CartDetailID',CartDetailIDSchema)