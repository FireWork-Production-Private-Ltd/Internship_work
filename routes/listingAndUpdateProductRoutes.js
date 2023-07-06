const express = require('express')
const ListingAndUpdateProductRoutes = express.Router()
const listingAndUpdateProductController = require('../controllers/ListingAndUpdateProduct/listingAndUpdateProductController')

ListingAndUpdateProductRoutes.post('/uploadsingleproduct', listingAndUpdateProductController.uploadsingleproduct)
ListingAndUpdateProductRoutes.post('/uploadproducts', listingAndUpdateProductController.uploadproducts)
ListingAndUpdateProductRoutes.post('/singleproductupdate', listingAndUpdateProductController.singleproductupdate)
ListingAndUpdateProductRoutes.post('/bulkproductupdate', listingAndUpdateProductController.bulkproductupdate)
ListingAndUpdateProductRoutes.post('/fetchalllistingproducts', listingAndUpdateProductController.fetchalllistingproducts)
ListingAndUpdateProductRoutes.post('/storeorupdateproduct', listingAndUpdateProductController.storeorupdateproduct)
ListingAndUpdateProductRoutes.post('/filterlistingandupdate', listingAndUpdateProductController.filterlistingandupdate)
ListingAndUpdateProductRoutes.post('/alllistingproducts', listingAndUpdateProductController.alllistingproducts)

module.exports = ListingAndUpdateProductRoutes