const express = require('express')
const mongoose = require('mongoose')
const ProductRoutes = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const productController = require('../controllers/product/productController')
const { isNullorUndefinedorEmpty } = require('../utility/util')
    //const RecentlyViewed = require('../models/RecentlyViewed')
const RecentlyViewedController = require('../controllers/product/RecentlyViewedController')


ProductRoutes.post('/server/createproduct', productController.createproduct)


ProductRoutes.post('/server/deleteproduct', productController.deleteproduct)


ProductRoutes.post('/server/updateproduct', productController.updateproduct)


ProductRoutes.post('/server/singleproduct', productController.singleproduct)

ProductRoutes.post('/server/getproducts', productController.getproducts)

ProductRoutes.post('/server/searchsingleproduct', productController.searchsingleproduct)


ProductRoutes.post('/server/searchproducts', productController.searchproducts)

ProductRoutes.post('/server/fetchproductinformation', productController.fetchproductinformation)
ProductRoutes.post('/server/listofproducts', productController.listofproducts)
ProductRoutes.post('/fetchproductinformation', productController.fetchproductinformation)
ProductRoutes.post('/listofproducts', productController.listofproducts)
ProductRoutes.post('/metalprice', productController.metalprice)
ProductRoutes.post('/recentlyaddedproducts', productController.recentlyaddedproducts)
ProductRoutes.post('/fetchallcategoriesproduct', productController.fetchallcategoriesproduct)
ProductRoutes.post('/fetchallsubcategoriesproduct', productController.fetchallsubcategoriesproduct)
ProductRoutes.post('/fetchsellersubcategory', productController.fetchsellersubcategory)
ProductRoutes.post('/fetchsellercategory', productController.fetchsellercategory)
ProductRoutes.post('/countsellerproduct', productController.countsellerproduct)



module.exports = ProductRoutes;