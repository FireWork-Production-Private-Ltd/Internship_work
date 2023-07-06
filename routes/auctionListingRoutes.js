const express = require('express')
const AuctionlistingRoute = express.Router()
const auctionListingController = require('../controllers/auctionListing/auctionListingController')


AuctionlistingRoute.post('/createauctionlisting',auctionListingController.createauctionlisting);

AuctionlistingRoute.post('/auctionjoin',auctionListingController.auctionjoin)

module.exports = AuctionlistingRoute;