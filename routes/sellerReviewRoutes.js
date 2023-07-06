const express = require('express')
const SellerReviewRoute = express.Router()
const sellerReviewController = require('../controllers/sellerReviews/sellerReviewController')

SellerReviewRoute.post('/createsellerreview',sellerReviewController.createsellerreview)
SellerReviewRoute.post('/fetchsellerreview',sellerReviewController.fetchsellerreview)
SellerReviewRoute.post('/countsellerreview',sellerReviewController.countsellerreview)


module.exports = SellerReviewRoute