const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

/*

1. Create Order Table 
Columns:orderreferencenumber,userid,paymentmethod, transactiondetails,productinfo:[{productid,producttitle,brandname, quantity,productimage,orderstatus,logistics,price}], additionalcharges, additionaldiscount,ordertotal.
1.Create Post route for Storing Orders (Product Info to be taken from cart table by userid), for every order orderreference number to be generated sequentially eg: WM-OD-1,WM-OD-2.... etc etc
2.Create Get Route for fetching order information by orderreferencenumber
*/

const AbandonedCartSchema = new Schema({
    cartdetailid:{
        type:String,
        unique:true,
        default:null
    },
    userid:{
        type:ObjectId,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    paymentmethod:{
        type:String,
        default:null
    },
    transactiondetails:{
        type:String,
        default:null
    },
    productinfo:[{
        productid:{
            type:ObjectId
        },
        producttitle:{
            type:String
        },
        brandname:{
            type:String,
        },
        quantity:{
            type:Number
        },
        productimage:{
            type:String
        },
        orderstatus:{
            type:String
        },
        logistics:{
            type:String
        },
        price:{
            type:Number
        }
    }],
    additionalcharges:{
        type:Number,
        default:null
    },
    additionaldiscount:{
        type:Number,
        default:null
    },
    ordertotal:{
        type:Number,
        default:null
    }
},{timestamps:true})

module.exports = AbandonedCart = mongoose.model("AbandonedCart",AbandonedCartSchema)