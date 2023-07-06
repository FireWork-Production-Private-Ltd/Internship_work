const express = require('express')
const Cart = require('../../models/Cart')
const Ordered = require('../../models/Ordered')
const Product = require('../../models/Product')
const OrderedRoutes = express.Router()
const User = require('../../models/User')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const ReferenceNumber = require('../../models/ReferenceNumber')
const orderedController = require('../../controllers/ordered/orderedController')
const { isNullorUndefinedorEmpty,fetchFromReferenceNumber, fetchFromCartDetailID } = require('../../utility/util')
const AbandonedCart = require('../../models/AbandonedCart')
async function storeabandonedcart(req,res){
    try{
        if(isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.paymentmethod)&& isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.transactiondetails) && isNullorUndefinedorEmpty(req.body.additionalcharges) && isNullorUndefinedorEmpty(req.body.additionaldiscount) && isNullorUndefinedorEmpty(req.body.logistics) && isNullorUndefinedorEmpty(req.body.orderstatus)){
            const fetchCartProduct = await Cart.aggregate([
                {$match: {
                    userid: ObjectId(req.body.userid),
                    isactive:true
                }},
                {        
                $lookup:
                    {
                        from: "products",
                        let:{prodid:"$productid",price:"$products.price"},
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$_id","$$prodid"] },
                                                { $eq: ["$isactive", true] },
                                                { $gt : [0,"$$price"]}
                                            ]
                                    }
                                }
                            }
                        ],
                        as: "products"
                    }
                }
            ])
            let objProducts = []
            let priceProduct = 0
            for(let i=0;i<fetchCartProduct.length;i++){
                let {_id,title,brandName,quantity,mainImage,price} = fetchCartProduct[i].products[0]
                // console.log(_id,title,brandName,quantity,mainImage,price);
                let productid = _id,producttitle=title,brandname=brandName,productimage=mainImage
                let orderstatus = req.body.orderstatus,logistics=req.body.logistics
                let objProductsInfo = {productid,producttitle,brandname,quantity,productimage,orderstatus,logistics,price}
                priceProduct = priceProduct + quantity*price
                objProducts.push(objProductsInfo)
            }
            priceProduct = (priceProduct+req.body.additionalcharges)*(1-(req.body.additionaldiscount)/100)
            // console.log(objProducts)
            // console.log(fetchCartProduct);
            const number = await fetchFromCartDetailID()
            const createOrdered = new AbandonedCart({
                cartdetailid:`WM-AC-${number}`,
                userid:req.body.userid,
                email:req.body.email,
                paymentmethod:req.body.paymentmethod,
                transactiondetails:req.body.transactiondetails,
                productinfo:objProducts,
                additionalcharges:req.body.additionalcharges,
                additionaldiscount:req.body.additionaldiscount,
                ordertotal:priceProduct
            })
            const saveCreatedOrdered = await createOrdered.save()
            // console.log(saveCreatedOrdered);
            res.json({
                error:null,
                data:saveCreatedOrdered
            })
        }else{
            res.json({
                error:"enter required field",
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

async function fetchabandonedcart(req,res){
    try{
        if(isNullorUndefinedorEmpty(req.body.cartdetailid)){
            const getOrdered = await AbandonedCart.findOne({cartdetailid:req.body.cartdetailid}).lean()
            if(getOrdered !== null){
                res.json({
                    error:null,
                    data:{
                        ...getOrdered
                    }
                })
            }else{
                res.json({
                    error:"enter valid cartdetailid",
                    data:null
                })
            }
        }else{
            res.json({
                error:"enter required field",
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

module.exports = {
    storeabandonedcart,
    fetchabandonedcart
}
