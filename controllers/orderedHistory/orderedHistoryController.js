const express = require('express')
const mongoose = require('mongoose')
const Ordered = require('../../models/Ordered')
const OrderedHistory = require('../../models/OrderedHistory')
const { isNullorUndefinedorEmpty } = require('../../utility/util')

async function storeuserhistory(req,res){
    try{
        if(isNullorUndefinedorEmpty(req.body.userid)){
            const findUser = await Ordered.find({userid:req.body.userid}).lean()
            // console.log(findUser);
            if(findUser !== null){
                var objOrderedReferenceNumber = []
                for(let i=0;i<findUser.length;i++){
                    objOrderedReferenceNumber.push({orderedreferencenumber:findUser[i].orderedreferencenumber})
                }
                // console.log(objOrderedReferenceNumber);
                const findUserInHistory = await OrderedHistory.findOne({userid:req.body.userid}).lean()
                // console.log(findUserInHistory);
                if(findUserInHistory !== null){
                    const updateUserHistory = await OrderedHistory.updateOne(
                        {
                            userid:req.body.userid
                        },
                        {
                            $set:{
                                orderedinfo:objOrderedReferenceNumber
                            }
                        }
                    )
                    const findUserHistory = await OrderedHistory.findOne({userid:req.body.userid}).lean()
                    // console.log(findUserHistory);
                    res.json({
                        error:null,
                        data:{
                            ...findUserHistory,
                            createdAt:findUserHistory.createdAt.toISOString(),
                            updatedAt:findUserHistory.updatedAt.toISOString()
                        }
                    })
                }else{
                    // console.log(objOrderedReferenceNumber);
                    const createOrderedHistory = new OrderedHistory({
                        userid:req.body.userid,
                        orderedinfo:objOrderedReferenceNumber
                    })
                    // console.log(createOrderedHistory);
                    const saveOrderedHistory = await createOrderedHistory.save()
                    console.log(saveOrderedHistory);
                    res.json({
                        error:null,
                        data:{
                            ...saveOrderedHistory._doc,
                            createdAt:saveOrderedHistory.createdAt.toISOString(),
                            updatedAt:saveOrderedHistory.updatedAt.toISOString()
                        }
                    })
                }
            }else{
                res.json({
                    error:"enter valid userid",
                    data:null
                })
            }
        }else{
            res.json({
                error:"enter userid",
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
    storeuserhistory
}