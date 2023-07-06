const Subscription = require("../../models/Subscription")
const User = require("../../models/User")
const { isNullorUndefinedorEmpty } = require("../../utility/util")

async function newsubscription(req,res){
    try{
        if(isNullorUndefinedorEmpty(req.body.sellerid) && isNullorUndefinedorEmpty(req.body.planname) && isNullorUndefinedorEmpty(req.body.amount)){
            const finduser = await User.findOne({_id:req.body.sellerid}).lean()
            if(finduser !== null && finduser.isSeller === true){
                const findoldsub = await Subscription.findOne({sellerid:req.body.sellerid}).lean()
                if(findoldsub !== null){
                    const updateoldsub = await Subscription.updateOne(
                        {sellerid:req.body.sellerid},
                        {
                            $set:{
                                planname:req.body.planname,
                                amount:req.body.amount
                            }
                        }
                    )
                    const findupdate = await Subscription.findOne({sellerid:req.body.sellerid}).lean()
                    res.json({
                        error:null,
                        data:{
                            ...findupdate
                        }
                    })
                }else{
                    const newsub = new Subscription({
                        planname:req.body.planname,
                        amount:req.body.amount,
                        sellerid:req.body.sellerid
                    })
                    const savesub = await newsub.save()
                    res.json({
                        error:null,
                        data:{
                            ...savesub._doc
                        }
                    })
                }
            }else{
                res.json({
                    error:"enter valid user",
                    data:null
                })
            }
        }else{
            res.json({
                error:"enter required fields",
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

async function listofallsubscriptions(req,res){
    try{
        const findplans = await Subscription.distinct("planname")
        res.json({
            error:null,
            data:findplans
        })
    }catch(error){
        res.json({
            error:"something went wrong",
            data:null
        })
    }
}

module.exports = {
    newsubscription,
    listofallsubscriptions
}