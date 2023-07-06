const Ordered = require("../../models/Ordered")
const OrderedApproval = require("../../models/OrderedApproval")
const Product = require("../../models/Product")
const User = require("../../models/User")
const { isNullorUndefinedorEmpty, fetchFromOrderedNumber } = require("../../utility/util")

async function approvedchats(req, res) {
    try {
        const findapprovedchat = await OrderedApproval.aggregate({
            $match: {
                isapproved: true
            }
        })
        res.json({
            error: null,
            data: findapprovedchat
        })
    } catch (error) {
        res.json({
            error: "somthing went wrong",
            data: null
        })
    }
}
async function singlechatapproval(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.id)) {
            const getchatapproval = await OrderedApproval.findOne({ _id: req.body.id })

            res.json({
                error: null,
                data: getchatapproval
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


async function updateorderedfields(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.orderedapprovalid) && isNullorUndefinedorEmpty(req.body.status) && isNullorUndefinedorEmpty(req.body.approvedby)) {
            const findordered = await OrderedApproval.findOne({ _id: req.body.orderedapprovalid }).lean()
            const finduser = await User.findOne({ _id: req.body.approvedby })
            // console.log(findordered,finduser);
            if (findordered !== null && finduser !== null && finduser.isAdmin === true) {
                const updateordered = await OrderedApproval.updateOne({
                    _id: req.body.orderedapprovalid
                }, {
                    $set: {
                        status: req.body.status,
                        approvedBy: req.body.approvedby,
                        isapproved: true
                    }
                })
                const findproduct = await Product.findOne({ _id: findordered.productid }).lean()
                let productid, producttitle, brandname, quantity, productimage, orderstatus, price, logistics, additionalcharges, additionaldiscount
                if (findproduct !== null) {
                    productid = findproduct._id
                    producttitle = findproduct.title,
                    brandname = findproduct.brandName,
                    productimage = findproduct.mainImage,
                    quantity = isNullorUndefinedorEmpty(req.body.quantity) ? req.body.quantity : 1
                    price = findproduct.price
                    orderstatus = "Order-Placed"
                    logistics = isNullorUndefinedorEmpty(req.body.logistics) ? req.body.logistics : "logistics"
                    additionalcharges = isNullorUndefinedorEmpty(req.body.additionalcharges) ? req.body.additionalcharges : 0.0
                    additionaldiscount = isNullorUndefinedorEmpty(req.body.additionaldiscount) ? req.body.additionaldiscount : 0.0

                }
                let orderedreferencenumber = await fetchFromOrderedNumber()
                orderedreferencenumber = `JS-OD-${orderedreferencenumber}`
                // console.log(price, quantity, additionalcharges, additionaldiscount)
                const newordered = new Ordered({
                    orderedreferencenumber: orderedreferencenumber,
                    userid: req.body.approvedby,
                    email: isNullorUndefinedorEmpty(req.body.email) ? req.body.email : finduser.email,
                    paymentmethod: isNullorUndefinedorEmpty(req.body.paymentmethod) ? req.body.paymentmethod : "COD",
                    transactiondetails: isNullorUndefinedorEmpty(req.body.transactiondetails) ? req.body.transactiondetails : "transaction detail",
                    productinfo: {
                        productid: productid,
                        producttitle: producttitle,
                        brandname: brandname,
                        quantity: quantity,
                        productimage: productimage,
                        orderstatus: orderstatus,
                        logistics: logistics,
                        price: price
                    },
                    additionalcharges: additionalcharges,
                    additionaldiscount: additionaldiscount,
                    ordertotal: (price * quantity + additionalcharges) * (1 - (additionaldiscount / 100))

                })
                const saveordered = await newordered.save()
                // console.log(saveordered);
                const findupdatedordered = await OrderedApproval.findOne({ _id: req.body.orderedapprovalid }).lean()
                res.json({
                    error: null,
                    data: {
                        ...findupdatedordered,
                        createdAt: findupdatedordered.createdAt.toISOString(),
                        updatedAt: findupdatedordered.updatedAt.toISOString()
                    }
                })
            } else {
                res.json({
                    error: "enter valid orderedapprovalid or approvedby id",
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
        console.log(error)
        res.json({
            error: "Something Went Wrong",
            data: null
        })
    }
}
async function storeorderedapproval(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.buyeruserid) && isNullorUndefinedorEmpty(req.body.selleruserid) && isNullorUndefinedorEmpty(req.body.productid)) {

            const createorderedapproval = new OrderedApproval({
                buyeruserid: req.body.buyeruserid,
                selleruserid: req.body.selleruserid,
                status: isNullorUndefinedorEmpty(req.body.status) ? req.body.status : "requested",
                productid: req.body.productid
            })
            const saveorderedapproval = await createorderedapproval.save()

            res.json({
                err: null,
                data: {
                    ...saveorderedapproval._doc
                }
            })

        } else {
            res.json({
                error: "Provide all mandatory fields",
                data: null
            })
        }
    } catch (error) {
        //console.log(error)
        res.json({
            error: "Something Went Wrong",
            data: null
        })
    }
}
async function fetchapprovedordered(req, res) {
    try {
        const findapprovedordered = await OrderedApproval.find({ status: "approved" })
        res.json({
            error: null,
            data: findapprovedordered
        })
    } catch (error) {
        req.json({
            error: "something went wrong",
            data: null
        })
    }
}
async function fetchallorderapproval(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.id)) {
            const fetchorderapproval = await OrderedApproval.find()

            res.json({
                error: null,
                data: fetchorderapproval
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

module.exports = {
    approvedchats,
    updateorderedfields,
    storeorderedapproval,
    singlechatapproval,
    fetchapprovedordered,
    fetchallorderapproval
}