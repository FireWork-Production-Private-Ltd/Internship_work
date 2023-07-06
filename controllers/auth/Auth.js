const {isNullorUndefinedorEmpty} = require('../../utility/util')
const {SendMail} = require('../../utility/mail')
const EmailOtpValidation = require('../../models/EmailOtpValidation')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendOtp = async(req,res) => {
    try{
        if(isNullorUndefinedorEmpty(req.body.email)){
            const getemail = await EmailOtpValidation.findOne({email:req.body.email})
            let otp = Math.floor(100000 + Math.random() * 900000)
            let html = `
            <div>
            <p>Dear User</p>
            <p>Your OTP is <strong>${otp}</strong>. Will Expire After 3 Minutes.</p>
            <p>Team, Waste Management</>
            </div>
            `
            await SendMail(req.body.email,html)
            if(getemail !== null){
                const updateotp = await EmailOtpValidation.updateOne({email:getemail.email},{$set:{otp:otp}})
                const expireotp = async() => {
                    const clearotp = await EmailOtpValidation.updateOne({email:getemail.email},{$set:{otp:null}})
                }
                setTimeout(expireotp, 180000);
            }
            else{
                const createemailotp = new EmailOtpValidation({
                    email:req.body.email,
                    otp:otp
                })
                const saveemailotp = await createemailotp.save()
                const expireotp = async() => {
                    const clearotp = await EmailOtpValidation.updateOne({email:saveemailotp.email},{$set:{otp:null}})
                }
                setTimeout(expireotp, 180000);
            }
            res.json({
                error:null,
                data:"OTP Sended"
            })
        }
        else{
            res.json({
                error:"Please Provide Email",
                data:null
            })
        }
    }
    catch(error){

    }
}
const register = async(req,res) => {
    if (isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.otp) && isNullorUndefinedorEmpty(req.body.password) && (req.body.isBuyer !== null && req.body.isBuyer !== undefined && req.body.isBuyer === true || req.body.isSeller !== null && req.body.isSeller !== undefined && req.body.isSeller === true)) {
        //Check if User Exists 
        const getuser = await User.findOne({ email: req.body.email })
        //Create New User Validation
        const getotp = await EmailOtpValidation.findOne({ email: req.body.email })
        if (getotp === null) {
          return res.json({
                error: "OTP is Not Generated Try Again",
                data: null
            })
        }
        if (req.body.otp !== getotp.otp) {
            return res.json({
                error: "Invalid OTP",
                data: null
            })
        }
        const password = await bcrypt.hash(req.body.password, 12)
        if (getuser !== null) {
            const updatepassword = await User.updateOne({email:req.body.email},{$set:{password:password,isSeller:req.body.isSeller === true?true:getuser.isSeller,isBuyer:req.body.isBuyer === true?true:getuser.isBuyer}})
           return res.json({
                error: null,
                message:"Password Updated Successfully",
                data: {
                    ...getuser._doc,
                    password:null,
                    hash:null,
                    createdAt: getuser.createdAt.toISOString(),
                    updatedAt: getuser.updatedAt.toISOString(),
                }
            })
        }
        else {
            if (req.body.isSeller === true) {
                if(!isNullorUndefinedorEmpty(req.body.gst)){
                    return res.json({
                        error: "GST Number is Mandatory",
                        data: null
                    })
                }
            }
            const createuser = new User({
                email: req.body.email,
                password: password,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                isBuyer: req.body.isBuyer,
                isSeller: req.body.isSeller,
                gst:req.body.gst
            })
            const saveuser = await createuser.save()
          return res.json({
                error: null,
                message:"Congratulations You are been Registed",
                data: {
                    ...saveuser._doc,
                    password:null,
                    createdAt: saveuser.createdAt.toISOString(),
                    updatedAt: saveuser.updatedAt.toISOString(),
                }
            })
        }
    } else {
       return res.json({
            error: "Invalid or Missing Parameters",
            data: null
        })
    }
}
const login = async(req,res) => {
    try{
        if(isNullorUndefinedorEmpty(req.body.email) && isNullorUndefinedorEmpty(req.body.password) && (req.body.isBuyer !== null && req.body.isBuyer !== undefined && req.body.isBuyer === true || req.body.isSeller !== null && req.body.isSeller !== undefined && req.body.isSeller === true)){
            let UserObj = {}
            UserObj.email = req.body.email
            if(req.body.isBuyer){
                UserObj.isBuyer = req.body.isBuyer  
            }
            if(req.body.isSeller){
                UserObj.isSeller = req.body.isSeller  
            }
            console.log(UserObj,"UserObj")
            const getuser = await User.findOne(UserObj)
            if(getuser !== null){
                const comparepassword = await bcrypt.compare(req.body.password,getuser.password)
                if(!comparepassword){
                    return res.json({
                        error:"Invalid Password",
                        data:null
                    })
                }
                const token = await jwt.sign(
                    {email:getuser.email},
                    "secret key",
                    // {expiresIn:"1h"}
                )
                const updatetoken = await User.updateOne({email:req.body.email},{$set:{hash:token}})
                return res.json({
                    error:null,
                    data:{
                        token:token,
                        user:{
                            ...getuser._doc,
                            hash:null,
                            password:null
                        }
                    }
                })
            }
            else{
                res.json({
                    error:"You Do Not Have Access",
                    data:null
                })
            }
        }
        else{
            res.json({
                error:"Please Provide Email & Password",
                data:null
            })
        }
    }
    catch(error){

    }
}
module.exports = {
    sendOtp,
    register,
    login
}