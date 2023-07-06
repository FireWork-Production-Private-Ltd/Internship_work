const express = require('express')
const SubscriptionRoutes = express.Router()
const subscriptionController = require('../controllers/subscription/subscriptionController')

SubscriptionRoutes.post('/newsubscription',subscriptionController.newsubscription)
SubscriptionRoutes.post('/listofallsubscriptions',subscriptionController.listofallsubscriptions)

module.exports = SubscriptionRoutes