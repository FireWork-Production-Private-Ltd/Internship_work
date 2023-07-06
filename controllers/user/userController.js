const express = require('express')
const UserRoutes = express.Router()
const User = require('../../models/User')
const userController = require('../../controllers/user/userController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
async function createuser(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.email) && (req.body.isBuyer !== null && req.body.isBuyer !== undefined && req.body.isBuyer === "true" || req.body.isSeller !== null && req.body.isSeller !== undefined && req.body.isSeller === "true")) {
            //Check if User Exists 
            const getuser = await User.findOne({ email: req.body.email }).lean()
            if (getuser !== null) {
                //User Exists Update User
                const updateuser = await User.updateOne({
                    email: getuser.email
                }, {
                    $set: {
                        name: isNullorUndefinedorEmpty(req.body.name) ? req.body.name : getuser.name,
                        phoneNumber: isNullorUndefinedorEmpty(req.body.phoneNumber) ? req.body.phoneNumber : getuser.phoneNumber,
                        address: isNullorUndefinedorEmpty(req.body.address) ? req.body.address : getuser.address,
                        city: isNullorUndefinedorEmpty(req.body.city) ? req.body.city : getuser.city,
                        state: isNullorUndefinedorEmpty(req.body.state) ? req.body.state : getuser.state,
                        country: isNullorUndefinedorEmpty(req.body.country) ? req.body.country : getuser.country,
                        isBuyer: req.body.isBuyer !== null && req.body.isBuyer !== undefined && req.body.isBuyer === true ? req.body.isBuyer : getuser.isBuyer,
                        isSeller: req.body.isSeller !== null && req.body.isSeller !== undefined && req.body.isSeller === true ? req.body.isSeller : getuser.isSeller,
                        isAdmin:isNullorUndefinedorEmpty(req.body.isAdmin)?req.body.isAdmin:false
                    }
                })
                const getupdateduser = await User.findOne({ email: getuser.email }).lean()
                    // console.log(getupdateduser);
                res.json({
                    error: null,
                    data: {
                        ...getupdateduser,
                        createdAt: getupdateduser.createdAt.toISOString(),
                        updatedAt: getupdateduser.updatedAt.toISOString()
                    }
                })
            } else {
                //Create New User
                const createuser = new User({
                    email: req.body.email,
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    isBuyer: req.body.isBuyer,
                    isSeller: req.body.isSeller,
                    isAdmin:isNullorUndefinedorEmpty(req.body.isAdmin)?req.body.isAdmin:false
                })
                const saveuser = await createuser.save()
                // console.log(saveuser)
                res.json({
                    error: null,
                    data: {
                        ...saveuser._doc,
                        createdAt: saveuser.createdAt.toISOString(),
                        updatedAt: saveuser.updatedAt.toISOString(),
                    }
                })
            }
        } else {
            res.json({
                error: "Invalid or Missing Parameters",
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

module.exports = {
    createuser
}