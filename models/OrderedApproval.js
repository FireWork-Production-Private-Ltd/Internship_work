const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const OrderedApprovalSchema = new Schema({
    buyeruserid: {
        type: ObjectId,
        default: null
    },
    selleruserid: {
        type: ObjectId,
        default: null
    },
    status: {
        type: String,
        enum: ['disapproved', 'approved', 'requested'],
        default:"requested"
    },
    approvedBy: {
        type: ObjectId,
        default: null
    },
    isapproved: {
        type: Boolean,
        default: true
    },
    productid: {
        type: ObjectId,
        default: null
    }
}, { timestamps: true })

module.exports = OrderedApproval = mongoose.model("OrderedApproval", OrderedApprovalSchema)