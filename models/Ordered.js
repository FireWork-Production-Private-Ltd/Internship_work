const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

/*

1. Create Order Table 
Columns:orderreferencenumber,userid,paymentmethod, transactiondetails,productinfo:[{productid,producttitle,brandname, quantity,productimage,orderstatus,logistics,price}], additionalcharges, additionaldiscount,ordertotal.
1.Create Post route for Storing Orders (Product Info to be taken from cart table by userid), for every order orderreference number to be generated sequentially eg: WM-OD-1,WM-OD-2.... etc etc
2.Create Get Route for fetching order information by orderreferencenumber
*/

const OrderedSchema = new Schema({
    orderedreferencenumber: {
        type:String
    },
    userid: {
        type: ObjectId
    },
    email: {
        type: String,
        default: null
    },
    paymentmethod: {
        type: String,
        default: null
    },
    transactiondetails: {
        type: String,
        default: null
    },
    productinfo: {
        productid: {
            type: ObjectId,
            default: null
        },
        producttitle: {
            type: String,
            default: null
        },
        brandname: {
            type: String,
            default: null
        },
        quantity: {
            type: Number,
            default: null
        },
        productimage: {
            type: String,
            default: null
        },
        orderstatus: {
            type: String,
            enum: ['Order-Placed', 'Order-Processed', 'Order-Delivered', 'Order-Cancelled']
        },
        logistics: {
            type: String,
            default: null
        },
        price: {
            type: Number,
            default: null
        }
    },
    additionalcharges: {
        type: Number,
        default: null
    },
    additionaldiscount: {
        type: Number,
        default: null
    },
    sellerid:{
        type:ObjectId,
    },
    buyerid:{
        type:ObjectId
    },
    ordertotal: {
        type: Number,
        default: null
    }
}, { timestamps: true })

module.exports = Ordered = mongoose.model("Ordered", OrderedSchema)