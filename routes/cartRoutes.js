const express = require('express')
const mongoose = require('mongoose')
const CartRoutes = express.Router()
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const User = require('../models/User')
const cartController = require('../controllers/cart/cartController')
const { isNullorUndefinedorEmpty } = require('../utility/util')
const ObjectId = mongoose.Types.ObjectId

CartRoutes.post('/createcart', cartController.createcart)

CartRoutes.post('/updatecart', cartController.updatecart)

CartRoutes.post('/fetchcart', cartController.fetchcart)

module.exports = CartRoutes;
