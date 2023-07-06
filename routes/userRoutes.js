const express = require('express')
const UserRoutes = express.Router()
const User = require('../models/User')
const userController = require('../controllers/user/userController')
const { isNullorUndefinedorEmpty } = require('../utility/util')
UserRoutes.post('/createuser', userController.createuser)

module.exports = UserRoutes;