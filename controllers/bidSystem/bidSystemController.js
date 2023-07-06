const express = require('express')
const mongoose = require('mongoose')
const BidSystemRoute = express.Router()
const BidSystem = require("../../models/BidSystem")
const Product = require("../../models/Product")
const User = require("../../models/User")
const { isNullorUndefinedorEmpty } = require("../../utility/util")

async function createbid(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.buyerid) && isNullorUndefinedorEmpty(req.body.productid) && isNullorUndefinedorEmpty(req.body.bidprice)) {
            const finduser = await User.findOne({ _id: req.body.buyerid }).lean()
            const findproduct = await Product.findOne({ _id: req.body.productid }).lean()
            if (finduser !== null && findproduct !== null && finduser.isBuyer === true) {
                const finduserbid = await BidSystem.findOne({ buyerid: req.body.buyerid, productid: req.body.productid }).lean()
                if (finduserbid !== null) {
                    const updatebid = await BidSystem.updateOne(
                        { buyerid: req.body.buyerid, productid: req.body.productid },
                        {
                            $set: {
                                bidprice: req.body.bidprice,
                                comment: isNullorUndefinedorEmpty(req.body.comment) ? req.body.comment : ""
                            }
                        }
                    )
                    const finduserbid = await BidSystem.findOne({ buyerid: req.body.buyerid, productid: req.body.productid }).lean()
                    res.json({
                        error: null,
                        data: {
                            ...finduserbid
                        }
                    })
                } else {
                    const newbiduser = new BidSystem({
                        buyerid: req.body.buyerid,
                        productid: req.body.productid,
                        bidprice: req.body.bidprice,
                        comment: isNullorUndefinedorEmpty(req.body.comment) ? req.body.comment : ""
                    })
                    const savenewbid = await newbiduser.save()
                    res.json({
                        error: null,
                        data: {
                            ...savenewbid._doc
                        }
                    })
                }
            } else {
                res.json({
                    error: "enter valid user or product",
                    data: null
                })
            }
        } else {
            res.json({
                error: "enter require fields",
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

async function highestbid(req, res) {
    try {

        const fetchbid = await CustomerReview.aggregate([
            { $sort: { bidprice: -1 } }, { $limit: 1 }
        ])

        res.json({
            error: null,
            data: fetchbid
        })

    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null
        })
    }
}

async function listofallbids(req, res) {
    try {

        const fetchbid = await CustomerReview.find()


        if (fetchbid !== null) {
            res.json({
                error: null,
                data: fetchbid
            })
        } else {
            res.json({
                error: "No Product available",
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
    createbid,
    highestbid,
    listofallbids
}