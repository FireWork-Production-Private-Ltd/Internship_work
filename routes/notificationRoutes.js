const express = require('express')
const Notification = require('../models/Notification')
const User = require('../models/User')
const NotificationRoutes = express.Router()


const NotificationController = require('../controllers/notification/notifications')
const { isNullorUndefinedorEmpty, fetchFromReferenceNumber } = require('../utility/util')

NotificationRoutes.post('/fetchallnotification', NotificationController.fetchallnotification)
NotificationRoutes.post('/createnotification', NotificationController.createnotification)



module.exports = NotificationRoutes;