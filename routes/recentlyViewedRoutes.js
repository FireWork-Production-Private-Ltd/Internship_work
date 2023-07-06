const express = require('express')
const Ordered = require('../models/Ordered')
const Product = require('../models/Product')
const RecentlyViewedRoutes = express.Router()
const User = require('../models/User')

const RecentlyViewedController = require('../controllers/product/RecentlyViewedController')
const { isNullorUndefinedorEmpty, fetchFromReferenceNumber } = require('../utility/util')

RecentlyViewedRoutes.post('/recentlyviewedproduct', RecentlyViewedController.recentlyviewedproduct)

RecentlyViewedRoutes.post('/fetchrecentlyviewed', RecentlyViewedController.fetchrecentlyviewed)

RecentlyViewedRoutes.post('/mostviewedproduct',RecentlyViewedController.mostviewedproduct)

module.exports = RecentlyViewedRoutes;