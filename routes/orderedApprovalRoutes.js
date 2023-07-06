const express = require('express')
const OrderedApprovalRoutes = express.Router()
const OrderedApprovalController = require('../controllers/orderedApproval/orderedApprovalController')

OrderedApprovalRoutes.post('/updateorderedfields', OrderedApprovalController.updateorderedfields)
// OrderedApprovalRoutes.post('/approvedchats', OrderedApprovalController.approvedchats)
OrderedApprovalRoutes.post('/storeorderedapproval', OrderedApprovalController.storeorderedapproval)
// OrderedApprovalRoutes.get('/singlechatapproval', OrderedApprovalController.singlechatapproval)
OrderedApprovalRoutes.post('/fetchapprovedordered',OrderedApprovalController.fetchapprovedordered)

module.exports = OrderedApprovalRoutes