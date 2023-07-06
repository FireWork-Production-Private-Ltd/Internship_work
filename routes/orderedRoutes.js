const express = require('express')
const Cart = require('../models/Cart')
const Ordered = require('../models/Ordered')
const Product = require('../models/Product')
const OrderedRoutes = express.Router()
const User = require('../models/User')
const ReferenceNumber = require('../models/ReferenceNumber')
const orderedController = require('../controllers/ordered/orderedController')
// const orderedC = require('../controllers/ordered/storeorderedreport')
const { isNullorUndefinedorEmpty,fetchFromReferenceNumber } = require('../utility/util')



OrderedRoutes.post('/storeordered',orderedController.storeordered)


OrderedRoutes.post('/fetchordered',orderedController.fetchordered)

OrderedRoutes.post('/createordered',orderedController.createordered)
OrderedRoutes.post('/countsellerorder',orderedController.countsellerorder)



module.exports = OrderedRoutes;