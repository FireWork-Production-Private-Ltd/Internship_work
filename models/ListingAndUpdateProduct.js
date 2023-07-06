const mongoose = require("mongoose")
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const ListingAndUpdateProductSchema = new Schema({
    brandName: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    bulletPoints: {
        type: String,
        default: null
    },
    height: {
        type: Number,
        default: null
    },
    width: {
        type: Number,
        default: null
    },
    length: {
        type: Number,
        default: null
    },
    weight: {
        type: Number,
        default: null
    },
    mainImage: {
        type: String,
        default: null
    },
    additionalImage1: {
        type: String,
        default: null
    },
    additionalImage2: {
        type: String,
        default: null
    },
    additionalImage3: {
        type: String,
        default: null
    },
    additionalImage4: {
        type: String,
        default: null
    },
    additionalImage5: {
        type: String,
        default: null
    },
    createdBy: {
        type: ObjectId,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    category: {
        type: String
    },
    subcategory: {
        type: String,
        default: null
    },
    leafcategory: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    isactive: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String
    },
    isapproved:{
        type:Boolean,
        default:false
    },
    approvedby:{
        type:ObjectId,
        default:null
    },
    operations:{
        type:String,
        default:null
    }
}, { timestamps: true })

ListingAndUpdateProductSchema.index({ title: "text" })

module.exports = ListingAndUpdateProduct = mongoose.model("ListingAndUpdateProduct", ListingAndUpdateProductSchema);