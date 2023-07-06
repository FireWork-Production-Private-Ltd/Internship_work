const express = require('express')
const QuestionandanswerRoutes = express.Router()
const Questionandanswer = require('../models/Questionandanswer')
const questionandanswerController = require('../controllers/questionandanser/questionandanswerController')
const { isNullorUndefinedorEmpty, fetchFromReferenceNumber } = require('../utility/util')



QuestionandanswerRoutes.post('/storequestion', questionandanswerController.storequestion)
QuestionandanswerRoutes.post('/fetchquestionandanswer', questionandanswerController.fetchquestionandanswer)
QuestionandanswerRoutes.post('/updateanswer', questionandanswerController.updateanswer)


module.exports = QuestionandanswerRoutes;