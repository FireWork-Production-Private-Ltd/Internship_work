const express = require('express')
const mongoose = require('mongoose')
const StoreReportRoutes = express.Router()
const StoreReport = require('../../models/StoreReport')
const reviewController = require('../../controllers/report/storereportController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
const { main } = require('../../controllers/report/reportSender');
const ObjectId = mongoose.Types.ObjectId

async function storereport(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.productid)) {

            const addreport = await StoreReport.findOne({ userid: req.body.userid, productid: req.body.productid })
            if (addreport !== null) {

                const updatereport = await StoreReport.updateOne({
                    userid: addreport.userid,
                    productid: addreport.productid
                }, {
                    $set: {
                        description: req.body.description
                    }
                })

                const getupdatedreport = await StoreReport.findOne({ userid: req.body.userid, productid: req.body.productid }).lean()

                res.json({
                    error: null,
                    data: {
                        ...getupdatedreport
                    }
                })
                main()

            } else {
                const createreport = new StoreReport({
                    userid: req.body.userid,
                    productid: req.body.productid,
                    description: req.body.description
                })

                const savereport = await createreport.save()

                res.json({
                    error: null,
                    data: {
                        ...savereport
                    }
                })
                main()
            }
        } else {
            res.json({
                error: "Provide all mandatory fields",
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
    storereport
}