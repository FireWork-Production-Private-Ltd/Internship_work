const express = require('express')
const mongoose = require('mongoose')
const CartRoutes = express.Router()
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')
const User = require('../../models/User')
const cartController = require('../../controllers/cart/cartController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
const ObjectId = mongoose.Types.ObjectId

async function updatecart(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.quantity) && isNullorUndefinedorEmpty(req.body.productid)) {
            const getCart = await Cart.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
                // for quantity validation required to check whether entered quantity is greater to product quantity or not
            const getProduct = await Product.findOne({ _id: req.body.productid }).lean()
                // const updateProduct = await Product.updateOne({
                //     _id:getCart.productid
                // },
                //     {
                //         $set: {
                //             quantity: 100
                //         }
                //     }
                // )
            if (!(req.body.quantity > 0 && req.body.quantity <= getProduct.quantity)) {
                res.json({
                    error: "enter valid quantity",
                    data: null
                })

            } else if (getCart !== null) {
                const updateCart = await Cart.updateOne({
                        userid: req.body.userid,
                        productid: req.body.productid
                    }, {
                        $set: {
                            quantity: req.body.quantity
                        }
                    })
                    // console.log(updateCart);
                    // const updateProduct = await Product.updateOne({
                    //     _id: getCart.productid
                    // },
                    //     {
                    //         $set: {
                    //             quantity: getProduct.quantity - req.body.quantity
                    //         }
                    //     }
                    // )
                    // console.log(updateProduct);
                const getUpdatedCart = await Cart.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
                res.json({
                    error: null,
                    data: {
                        ...getUpdatedCart,
                        createdAt: getUpdatedCart.createdAt.toISOString(),
                        updatedAt: getUpdatedCart.updatedAt.toISOString()
                    }
                })
            } else {
                res.json({
                    error: "enter valid cartid",
                    data: null
                })
            }
        } else {
            res.json({
                error: "enter cartid",
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

async function fetchcart(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid)) {
            const fetchCartProduct = await Cart.aggregate([{
                        $match: {
                            userid: ObjectId(req.body.userid),
                            isactive: true
                        }
                    },
                    {
                        $lookup: {
                            from: "products",
                            let: { prodid: "$productid", price: "$products.price" },
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$prodid"] },
                                            { $eq: ["$isactive", true] },
                                            { $gt: [0, "$$price"] }
                                        ]
                                    }
                                }
                            }],
                            as: "products"
                        }
                    }
                ])
                // console.log(fetchCartProduct);
            res.json({
                error: null,
                data: fetchCartProduct
            })
        } else {
            res.json({
                error: "enter userid",
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




async function createcart(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.productid) && isNullorUndefinedorEmpty(req.body.quantity)) {
            const findCart = await Cart.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()
            const findProduct = await Product.findOne({ _id: req.body.productid }).lean()
            const findUser = await User.findOne({ _id: req.body.userid }).lean()
                // console.log(findProduct);
            if (req.body.quantity <= 0 || req.body.quantity > findProduct.quantity) {
                res.json({
                    error: "enter valid quantity",
                    data: null
                })
            } else if (findCart !== null) {

                const updateCart = await Cart.updateOne({
                    userid: req.body.userid,
                    productid: req.body.productid
                }, {
                    $set: {
                        quantity: req.body.quantity
                    }
                })
                const responseCart = await Cart.findOne({ userid: req.body.userid, productid: req.body.productid })
                res.json({
                    error: null,
                    data: responseCart
                })

            } else if (findProduct !== null && findUser !== null) {
                const createCart = new Cart({
                    userid: req.body.userid,
                    productid: req.body.productid,
                    quantity: req.body.quantity
                })
                const saveCart = await createCart.save()
                res.json({
                    error: null,
                    data: {
                        ...saveCart._doc,
                        createdAt: saveCart.createdAt.toISOString(),
                        updatedAt: saveCart.updatedAt.toISOString(),
                    }
                })
            } else {
                res.json({
                    error: "enter valid userid or productid",
                    data: null
                })
            }
        } else {
            res.json({
                error: "enter mandatory fields",
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
    createcart,
    updatecart,
    fetchcart
}