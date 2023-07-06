const express = require('express')
const mongoose = require('mongoose')
const QuestionandanswerRoutes = express.Router()
const Questionandanswer = require('../../models/Questionandanswer')
const Product = require('../../models/Product')
const questionandanswerController = require('../../controllers/questionandanser/questionandanswerController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
const ObjectId = mongoose.Types.ObjectId

async function storequestion(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.productid)) {

            const storeques = await Questionandanswer.findOne({ userid: req.body.userid, productid: req.body.productid })
            if (storeques !== null) {

                const updateques = await Questionandanswer.updateOne({
                    userid: storeques.userid,
                    productid: storeques.productid
                }, {
                    $set: {
                        question: isNullorUndefinedorEmpty(req.body.question) ? req.body.question : storeques.question,
                    },
                    $unset: { answer: "" }
                })
                const getupdated = await Questionandanswer.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
                res.json({
                    error: null,
                    data: {
                        ...getupdated
                    }
                })

            } else {
                const createques = new Questionandanswer({
                    userid: req.body.userid,
                    productid: req.body.productid,
                    question: req.body.question
                })

                const saveques = await createques.save()

                res.json({
                    error: null,
                    data: {
                        ...saveques._doc
                    }
                })
            }
        }
    } catch (error) {
        res.json({
            error: "Something Went Wrong",
            data: null
        })
        console.log(error)
    }
}

async function updateanswer(req, res) {
    try {
        //console.log(req.body)
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.productid) && isNullorUndefinedorEmpty(req.body.sellerid)) {
            const storeans = await Questionandanswer.findOne({ userid: req.body.userid, productid: req.body.productid })
            const getproduct = await Product.findOne({ _id: req.body.productid })

            if (storeans !== null && getproduct != null && req.body.sellerid.toString() === getproduct.createdBy.toString()) {

                const updateans = await Questionandanswer.updateOne({
                    userid: storeans.userid,
                    productid: storeans.productid,
                    question: storeans.question
                }, {
                    $set: {
                        answer: req.body.answer
                    }
                })

                const getupdated = await Questionandanswer.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
                    // console.log(getupdateduser);
                res.json({
                    error: null,
                    data: {
                        ...getupdated
                    }
                })

            } else {
                res.json({
                    error: "Invalid or Missing Parameters",
                    data: null
                })
            }
        }
    } catch (error) {
        res.json({
            error: "Something Went Wrong",
            data: null
        })
        console.log(error)
    }
}

async function fetchquestionandanswer(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.productid)) {

            const fetchq = await Questionandanswer.aggregate([{
                $match: {
                    productid: ObjectId(req.body.productid)
                }
            }])
            console.log(fetchq);
            res.json({
                error: null,
                data: fetchq
            })
        } else {
            res.json({
                error: "Answer Doesn't Exists",
                data: null
            })
        }
    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null
        })
    }
}


module.exports = {
    storequestion,
    updateanswer,
    fetchquestionandanswer
}