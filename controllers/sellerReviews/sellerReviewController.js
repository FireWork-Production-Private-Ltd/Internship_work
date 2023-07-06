const { default: mongoose } = require("mongoose")
const SellerReviews = require("../../models/SellerReviews")
const User = require("../../models/User")
const ObjectId = mongoose.Types.ObjectId
const { isNullorUndefinedorEmpty } = require("../../utility/util")


async function createsellerreview(req,res){
    try{
        if(isNullorUndefinedorEmpty(req.body.buyerid) && isNullorUndefinedorEmpty(req.body.sellerid) && isNullorUndefinedorEmpty(req.body.review) && isNullorUndefinedorEmpty(req.body.rating)){
            const findbuyer = await User.findOne({_id:req.body.buyerid}).lean()
            const findseller = await User.findOne({_id:req.body.sellerid}).lean()
            // console.log(findbuyer,findseller)
            if(findbuyer !== null && findbuyer.isBuyer === true && findseller !== null && findseller.isSeller === true){
                const findsellerreview = await SellerReviews.findOne({buyerid:req.body.buyerid,sellerid:req.body.sellerid}).lean()
                // console.log(findsellerreview)
                if(findsellerreview !== null){
                    const updatereview = await SellerReviews.updateOne(
                        {buyerid:req.body.buyerid,sellerid:req.body.sellerid},
                        {
                            $set:{
                                review:req.body.review,
                                rating:req.body.rating
                            }
                        }
                    )
                    const returnreview = await SellerReviews.findOne({ buyerid: req.body.buyerid, sellerid: req.body.sellerid }).lean()
                    res.json({
                        error:null,
                        data:{
                            ...returnreview
                        }
                    })
                }else{
                    const newreview = new SellerReviews({
                        buyerid:req.body.buyerid,
                        sellerid:req.body.sellerid,
                        rating:req.body.rating,
                        review:req.body.review
                    })
                    // console.log(newreview)
                    const savenewreview = await newreview.save()
                    // console.log(savenewreview)
                    res.json({
                        error:null,
                        data:{
                            ...savenewreview._doc
                        }
                    })
                }
            }else{
                res.json({
                    error:"enter valid buyer or seller",
                    data:null
                })
            }
        }else{
            res.json({
                error:"enter valid fields",
                data:null
            })
        }
    }catch(error){
        res.json({
            error:"something went wrong",
            data:null
        })
    }
}


async function fetchsellerreview(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.sellerid)) {
            const fetchsellerrev = await SellerReviews.aggregate([{
                $match: {
                    sellerid: ObjectId(req.body.sellerid)
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
                data: fetchsellerrev
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

async function countsellerreview(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.sellerid)) {
            const fetchsellerrev = await SellerReviews.find({sellerid:req.body.sellerid}).count()

            res.json({
                error: null,
                data: fetchsellerrev
            })
        } else {
            res.json({
                error: "Zero Review Found",
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
    createsellerreview,
    fetchsellerreview,
    countsellerreview
}