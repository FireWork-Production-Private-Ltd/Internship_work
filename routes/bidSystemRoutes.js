const express = require('express')
const BidSystemRoute = express.Router()
const BidSystemController = require('../controllers/bidSystem/bidSystemController')

BidSystemRoute.post('/createbid',BidSystemController.createbid)
BidSystemRoute.post('/listofallbids',BidSystemController.listofallbids)
BidSystemRoute.post('/highestbid',BidSystemController.highestbid)



module.exports = BidSystemRoute;

