const express = require('express')
const mongoose = require('mongoose')
const customerReviewRoutes = express.Router()
const CustomerReview = require('../../models/CustomerReview')
const reviewController = require('../../controllers/review/reviewController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
const ObjectId = mongoose.Types.ObjectId

async function storecustomerreview(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.productid)) {

            const addreview = await CustomerReview.findOne({ userid: req.body.userid, productid: req.body.productid })
            if (addreview !== null) {

                const updatereview = await CustomerReview.updateOne({
                    userid: addreview.userid,
                    productid: addreview.productid
                }, {
                    $set: {
                        rating: req.body.rating,
                        review: req.body.review
                    }
                })

                const getupdatedreview = await CustomerReview.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
                    // console.log(getupdateduser);
                res.json({
                    error: null,
                    data: {
                        ...getupdatedreview
                    }
                })

            } else {
                const createreview = new CustomerReview({
                    userid: req.body.userid,
                    productid: req.body.productid,
                    rating: req.body.rating,
                    review: req.body.review
                })

                const savereview = await createreview.save()

                res.json({
                    error: null,
                    data: {
                        ...savereview
                    }
                })
            }
        }
    } catch (error) {
        res.json({
            error: "Something Went Wrong",
            data: null
        })
    }
}

async function fetchproductreview(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.productid)) {
            const fetchproductrev = await CustomerReview.aggregate([{
                    $match: {
                        productid: ObjectId(req.body.productid)
                    }
                },
                {
                    "$addFields": {
                        "average": { "$avg": "$rating" }
                    }
                }
            ])

            res.json({
                error: null,
                data: fetchproductrev
            })
        } else {
            res.json({
                error: "Review Doesn't Exists",
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
    storecustomerreview,
    fetchproductreview
}