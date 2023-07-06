const express = require('express')
const Ordered = require('../models/Ordered')
const Product = require('../models/Product')
const StoreReportRoutes = express.Router()
const StoreReport = require('../models/StoreReport')

const StorereportController = require('../controllers/report/storereportController')
const { isNullorUndefinedorEmpty, fetchFromReferenceNumber } = require('../utility/util')

StoreReportRoutes.post('/storereport', StorereportController.storereport)


module.exports = StoreReportRoutes;