const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    userid: {
        type: ObjectId,
    },
    message: {
        type: String,
    }

}, { timestamps: true })

module.exports = Notification = mongoose.model('Notification', NotificationSchema);