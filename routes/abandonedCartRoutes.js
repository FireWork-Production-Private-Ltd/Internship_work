const express = require('express')
const Cart = require('../models/Cart')
const Ordered = require('../models/Ordered')
const Product = require('../models/Product')
const AbandonedCartRoutes = express.Router()
const User = require('../models/User')
const abandonedCartController = require('../controllers/abandonedcart/abandonedCartController')



AbandonedCartRoutes.post('/storeabandonedcart',abandonedCartController.storeabandonedcart)


AbandonedCartRoutes.post('/fetchabandonedcart',abandonedCartController.fetchabandonedcart)

module.exports = AbandonedCartRoutes;