const express = require('express')
const mongoose = require('mongoose')
const NotificationRoutes = express.Router()
const Notification = require('../../models/Notification')
const User = require('../../models/User')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
const ObjectId = mongoose.Types.ObjectId

async function createnotification(req,res){
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && (isNullorUndefinedorEmpty(req.body.adminuserid)) && isNullorUndefinedorEmpty(req.body.message)) {

            const finduser = await User.findOne({ _id: req.body.userid }).lean()
            if (finduser.isAdmin === true) {

                const createnot = new Notification({
                    userid: req.body.userid,
                    message: req.body.message
                })

                const savenot = await createnot.save()

                res.json({
                    error: null,
                    data: {
                        ...savenot._doc
                    }
                })            
            } else {
                res.json({
                    error: "User is not admin",
                    data: null
                })
            }
        }else{
            res.json({
                error: "Fields Missing",
                data: null
            })
        }
    } catch (error) {
        res.json({
            error: "Something Went Wrong",
            data: null
        })
    }
}

async function fetchallnotification(req,res){
    try {
        if (isNullorUndefinedorEmpty(req.body.userid)) {
            const fetchnotification = await Notification.aggregate([{
                    $match: {
                        userid: ObjectId(req.body.userid)
                    }
                }
            ])

            res.json({
                error: null,
                data: fetchnotification 
            })
        } else {
            res.json({
                error: "Notification Doesn't Exists",
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
    fetchallnotification,
    createnotification
}