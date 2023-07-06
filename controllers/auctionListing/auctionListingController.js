const AuctionHistory = require("../../models/AuctionHistory")
const AuctionListing = require("../../models/AuctionListing")
const AuctionMembersJoining = require("../../models/AuctionMembersJoining")
const Product = require("../../models/Product")
const User = require("../../models/User")
const { isNullorUndefinedorEmpty } = require("../../utility/util")



async function createauctionlisting(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.sellerid) && isNullorUndefinedorEmpty(req.body.productid) && isNullorUndefinedorEmpty(req.body.maxbuyertojoin) && isNullorUndefinedorEmpty(req.body.basePrice) && isNullorUndefinedorEmpty(req.body.lowestSellingPrice)) {
            const findseller = await User.findOne({ _id: req.body.sellerid }).lean()
            const findproduct = await Product.findOne({ _id: req.body.productid }).lean()
            if (findseller === null || findproduct === null || findseller.isSeller === false) {
                res.json({
                    error: "enter valid seller or product",
                    data: null
                })
            } else {
                const newauction = new AuctionListing({
                    productid: req.body.productid,
                    sellerid: req.body.sellerid,
                    maxbuyertojoin: req.body.maxbuyertojoin,
                    lowestSellingPrice: req.body.lowestSellingPrice,
                    basePrice: req.body.basePrice,
                    isactive: false
                })

                const savenewauction = await newauction.save()
                const newmember = new AuctionMembersJoining({
                    auctionid: savenewauction._id,
                    maxmemberjoin: req.body.maxbuyertojoin
                })
                const newauctionhistory = new AuctionHistory({
                    auctionid:savenewauction._id,
                    sellerid:req.body.sellerid
                })
                const savenewhistory = await newauctionhistory.save()
                const saveauctionmemberjoin = await newmember.save()
                res.json({
                    error: null,
                    data: {
                        ...savenewauction._doc,
                        ...saveauctionmemberjoin._doc,
                        ...savenewhistory._doc
                    }
                })
            }
        } else {
            res.json({
                error: "enter required fields",
                data: null
            })
        }
    } catch (error) {
        res.json({
            error: "someting went wrong",
            data: null
        })
    }
}

async function auctionjoin(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.auctionid) && isNullorUndefinedorEmpty(req.body.buyerid)) {
            const findauction = await AuctionMembersJoining.findOne({ auctionid: req.body.auctionid }).lean()
            const findbuyer = await User.findOne({ _id: req.body.buyerid }).lean()
            if (findauction === null || findbuyer === null || findbuyer.isBuyer === false) {
                res.json({
                    error: "enter valid fields",
                    data: null
                })
            } else if (findauction.members.length >= findauction.maxmemberjoin) {
                res.json({
                    error: "auction is full",
                    data: null
                })
            } else {
                let memberofauction = findauction.members;
                memberofauction.push(req.body.buyerid)
                const updateauctionjoin = AuctionMembersJoining.updateOne(
                    { auctionid: req.body.auctionid },
                    {
                        $set: {
                            members: memberofauction
                        }
                    }
                )
                const findauction = await AuctionMembersJoining.findOne({auctionid:req.body.auctionid}).lean()
                res.json({
                    error:null,
                    data:findauction
                })
            }
        } else {
            res.json({
                error: "enter required fields",
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
    createauctionlisting,
    auctionjoin
}