const express = require('express')
const mongoose = require('mongoose')
const RecentlyViewedRoutes = express.Router()
const Product = require('../../models/Product')

const User = require('../../models/User')
const RecentlyViewed = require('../../models/RecentlyViewed')
const RecentlyViewedController = require('../../controllers/product/RecentlyViewedController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
const ObjectId = mongoose.Types.ObjectId


async function recentlyviewedproduct(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.productid)) {

            //Check if User Exists
            const recent = await RecentlyViewed.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
                //const getproductid = await RecentlyViewed.findOne({_id: req.body.productid }).lean()
            if (recent !== null) {

                const updaterecentlyviewed = await RecentlyViewed.updateOne({
                    userid: req.body.userid,
                    productid: req.body.productid,
                }, {
                    $set: {
                        numberofviews:recent.numberofviews+1,
                        updatedAt: new Date(),
                        createdAt: new Date()
                    }
                })

                const fetchUpdated = await RecentlyViewed.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
                res.json({
                    err: null,
                    data: {
                        ...fetchUpdated,
                        createdAt: fetchUpdated.createdAt.toISOString(),
                        updatedAt: fetchUpdated.updatedAt.toISOString()
                    }
                })
            } else {
                const createRecentlyViewed = new RecentlyViewed({
                    userid: req.body.userid,
                    productid: req.body.productid,
                    numberofviews:1
                })
                const saveRecentlyViewed = await createRecentlyViewed.save()

                res.json({
                    err: null,
                    data: {
                        ...saveRecentlyViewed._doc,
                        createdAt: saveRecentlyViewed.createdAt.toISOString(),
                        updatedAt: saveRecentlyViewed.updatedAt.toISOString()
                    }
                })
            }
        } else {
            res.json({
                error: "Provide all mandatory fields",
                data: null
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            error: "Something Went Wrong",
            data: null
        })
    }
}

async function fetchrecentlyviewed(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid)) {
            const fetchrecently = await RecentlyViewed.aggregate([{
                        $match: {
                            userid: ObjectId(req.body.userid)
                        }
                    },
                    {
                        $lookup: {
                            from: "products",
                            let: { prodid: "$productid" },

                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$prodid"] },
                                        ]
                                    }
                                }
                            }],
                            as: "products"
                        }
                    }
                ])
                //console.log(fetchrecently[0]);
            res.json({
                error: null,
                data: fetchrecently
            })
        } else {
            res.json({
                error: "Provide all mandatory fields",
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

async function mostviewedproduct(req,res){
    try{
        const findproducts = await RecentlyViewed.aggregate([{
            $sort:{
                numberofviews:-1
            }
        }])
        // console.log(findproducts)
        res.json({
            error:null,
            data:findproducts
        })
    }catch(error){
        res.json({
            error:"something went wrong",
            data:null
        })
    }
}

module.exports = {
    recentlyviewedproduct,
    fetchrecentlyviewed,
    mostviewedproduct
}