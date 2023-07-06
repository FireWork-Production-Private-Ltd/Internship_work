const mongoose = require('mongoose')
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId
// Cart Table Columns -> userid, productid, quantity, isactive, createdAt , updatedAt.
// 1. Create Route for Storing and Updating Cart.
// 2.Create Route for Fetching Cart and Product Information by userid.
// (Use $lookup aggregation for joining cart and product table)

const CartSchema = new Schema({
    userid:{
        type:ObjectId,
    },
    productid:{
        type:ObjectId,
    },
    quantity:{
        type:Number,
        default:null
    },
    isactive:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

module.exports = Cart = mongoose.model("Cart",CartSchema)   