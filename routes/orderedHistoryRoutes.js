const express = require('express')
const mongoose = require('mongoose')
const OrderedHistoryRoutes = express.Router()
const orderedHistoryController = require('../controllers/orderedHistory/orderedHistoryController')

OrderedHistoryRoutes.post('/storeuserhistory',orderedHistoryController.storeuserhistory)

module.exports = OrderedHistoryRoutes