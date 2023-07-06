const express = require('express')
const mongoose = require('mongoose')
const AuthRoutes = express.Router()
const AuthController = require('../controllers/auth/Auth')
AuthRoutes.post('/server/sendOtp', AuthController.sendOtp)
AuthRoutes.post('/server/register', AuthController.register)
AuthRoutes.post('/server/login', AuthController.login)

module.exports = AuthRoutes;