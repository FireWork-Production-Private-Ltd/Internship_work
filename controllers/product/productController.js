const express = require('express')
const mongoose = require('mongoose')
const ProductRoutes = express.Router()
const Product = require('../../models/Product')
const User = require('../../models/User')
const productController = require('../../controllers/product/productController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')
const { exchangeRates } = require('exchange-rates-api');
const isoCountryCurrency = require("iso-country-currency")
const Conversation = require('../../models/Conversation')
const ObjectId = mongoose.Types.ObjectId
const axios = require("axios");

async function createproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.brandName) && isNullorUndefinedorEmpty(req.body.title) && isNullorUndefinedorEmpty(req.body.description) && isNullorUndefinedorEmpty(req.body.weight) && isNullorUndefinedorEmpty(req.body.mainImage) && isNullorUndefinedorEmpty(req.body.additionalImage1) && isNullorUndefinedorEmpty(req.body.price) && isNullorUndefinedorEmpty(req.body.quantity) && isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.category) && isNullorUndefinedorEmpty(req.body.country)) {
      // console.log("DONE")
      //Check if User Exists
      const getuser = await User.findOne({ _id: req.body.userid }).lean()
      // console.log(req.body.userid,getuser);
      if (getuser !== null) {
        //Store Prouct Info
        const createProduct = new Product({
          brandName: req.body.brandName,
          title: req.body.title,
          description: req.body.description,
          bulletPoints: req.body.bulletPoints,
          height: req.body.height,
          width: req.body.width,
          length: req.body.length,
          weight: req.body.weight,
          mainImage: req.body.mainImage,
          additionalImage1: req.body.additionalImage1,
          additionalImage2: req.body.additionalImage2,
          additionalImage3: req.body.additionalImage3,
          additionalImage4: req.body.additionalImage4,
          additionalImage5: req.body.additionalImage5,
          price: req.body.price,
          quantity: req.body.quantity,
          category: req.body.category,
          createdBy: req.body.userid,
          subcategory: req.body.subcategory,
          leafcategory: req.body.leafcategory,
          country: req.body.country,
          isbid: isNullorUndefinedorEmpty(req.body.isbid) ? req.body.isbid : false
        })
        const saveProduct = await createProduct.save()
        res.json({
          err: null,
          data: {
            ...saveProduct._doc,
            createdAt: saveProduct.createdAt.toISOString(),
            updatedAt: saveProduct.updatedAt.toISOString()
          }
        })
      } else {
        res.json({
          error: "User Doesn't Exists",
          data: null
        })
      }
    } else {
      res.json({
        error: "Provide all Mandatory Fields",
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
  // const createProduct = new Products({
  //     brandName:req.body.brandName,
  //     title:req.body.title,
  //     description:req.body.description,
  //     bulletPoints:req.body.bulletPoints,
  //     height:req.body.height,
  //     width:req.body.width,
  //     length:req.body.length,
  //     weight:req.body.weight,
  //     mainImage:req.body.mainImage,
  //     additionalImage1:req.body.additionalImage1,
  //     additionalImage2:req.body.additionalImage2,
  //     additionalImage3:req.body.additionalImage3,
  //     additionalImage4:req.body.additionalImage4,
  //     additionalImage5:req.body.additionalImage5,
  //     price:req.body.price,
  //     quantity:req.body.quantity
  // })
  // const saveProduct = await createProduct.save()
  // // console.log(saveProduct);
  // res.json({
  //     err:null,
  //     data:{
  //         ...saveProduct._doc,
  //         createdAt:saveProduct.createdAt.toISOString(),
  //         updatedAt:saveProduct.updatedAt.toISOString()
  //     }
  // })
}

async function deleteproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.productid)) {
      const getproduct = await Product.findOne({ _id: req.body.productid }).lean()
      // console.log(getproduct, req.body.productid);
      if (getproduct !== null) {
        getproduct.isactive = false
        const updateDeleteProduct = await Product.updateOne({
          _id: req.body.productid
        }, {
          $set: {
            isactive: false
          }
        })
        const fetchDeletedProduct = await Product.findOne({ _id: req.body.productid }).lean()
        res.json({
          err: null,
          data: {
            ...fetchDeletedProduct,
            createdAt: fetchDeletedProduct.createdAt.toISOString(),
            updatedAt: fetchDeletedProduct.updatedAt.toISOString()
          }
        })
      } else {
        res.json({
          error: "Product Doesn't Exists",
          data: null
        })
      }
    } else {
      res.json({
        error: "Provide all Mandatory Fields",
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

async function updateproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.productid)) {

      const getproduct = await Product.findOne({ _id: req.body.productid }).lean()
      if (getproduct !== null) {
        const updateproduct = await Product.updateOne({
          _id: req.body.productid
        }, {
          $set: {
            brandName: isNullorUndefinedorEmpty(req.body.brandName) ? req.body.brandName : getproduct.brandName,
            title: isNullorUndefinedorEmpty(req.body.title) ? req.body.title : getproduct.title,
            description: isNullorUndefinedorEmpty(req.body.description) ? req.body.description : getproduct.description,
            bulletPoints: isNullorUndefinedorEmpty(req.body.bulletPoints) ? req.body.bulletPoints : getproduct.bulletPoint,
            height: isNullorUndefinedorEmpty(req.body.height) ? req.body.height : getproduct.height,
            width: isNullorUndefinedorEmpty(req.body.width) ? req.body.width : getproduct.width,
            length: isNullorUndefinedorEmpty(req.body.length) ? req.body.length : getproduct.length,
            weight: isNullorUndefinedorEmpty(req.body.weight) ? req.body.weight : getproduct.weight,
            mainImage: isNullorUndefinedorEmpty(req.body.mainImage) ? req.body.mainImage : getproduct.mainImage,
            additionalImage1: isNullorUndefinedorEmpty(req.body.additionalImage1) ? req.body.additionalImage1 : getproduct.additionalImage1,
            additionalImage2: isNullorUndefinedorEmpty(req.body.additionalImage2) ? req.body.additionalImage2 : getproduct.additionalImage2,
            additionalImage3: isNullorUndefinedorEmpty(req.body.additionalImage3) ? req.body.additionalImage3 : getproduct.additionalImage3,
            additionalImage4: isNullorUndefinedorEmpty(req.body.additionalImage4) ? req.body.additionalImage4 : getproduct.additionalImage4,
            additionalImage5: isNullorUndefinedorEmpty(req.body.additionalImage5) ? req.body.additionalImage5 : getproduct.additionalImage5,
            price: isNullorUndefinedorEmpty(req.body.price) ? req.body.price : getproduct.price,
            quantity: isNullorUndefinedorEmpty(req.body.quantity) ? req.body.quantity : getproduct.quantity,
            category: isNullorUndefinedorEmpty(req.body.category) ? req.body.category : getproduct.category,
            country: isNullorUndefinedorEmpty(req.body.country) ? req.body.country : getproduct.country,
            isbid: isNullorUndefinedorEmpty(req.body.isbid) ? req.body.isbid : false
          }
        })

        const saveproduct = await Product.findOne({ _id: req.body.productid })
        res.json({
          err: null,
          data: {
            ...saveproduct._doc,
            createdAt: saveproduct.createdAt.toISOString(),
            updatedAt: saveproduct.updatedAt.toISOString()
          }
        })
      } else {
        res.json({
          error: "Product Doesn't Exists",
          data: null
        })
      }
    } else {
      res.json({
        error: "Provide all Mandatory Fields",
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



async function singleproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.productid)) {
      // console.log(req.body.productid)
      const getproduct = await Product.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.body.productid)
          }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "User"
          }
        }, {
          $lookup: {
            from: "customerreviews",
            localField: "_id",
            foreignField: "productid",
            as: "ProductReview"
          }
        },
        { $unwind: "$User" }
      ])
      // console.log(getproduct)
      if (getproduct.length !== 0 && getproduct[0].isactive === true && isNullorUndefinedorEmpty(req.body.tocountry)) {
        const findCountry = await Conversation.findOne({ country: req.body.tocountry }).lean()
        const findCountry1 = await Conversation.findOne({ country: getproduct[0].country }).lean()
        // const x = await Conversation.findOne({country:"Hungary"})
        // console.log(x);
        // console.log(getproduct)
        // console.log(getproduct[0].country,req.body.tocountry);
        // console.log(findCountry,findCountry1)
        if (findCountry !== null) {
          getproduct[0].price = (getproduct[0].price / findCountry1.currencyvalue) * findCountry.currencyvalue
        }
        res.json({
          error: null,
          data: {
            ...getproduct[0]
          }
        })
      } else {
        res.json({
          error: "Invalid productid",
          data: null
        })
      }

    } else {
      res.json({
        error: "enter productid",
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
async function getproducts(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.createdBy)) {
      const getproduct = await Product.aggregate([{
        $match: {
          createdBy: ObjectId(req.body.createdBy)
        }
      }])
      // console.log(getproduct);
      if (getproduct !== null) {
        res.json({
          error: null,
          data: getproduct
        })
      } else {
        res.json({
          error: "Invalid createdBy",
          data: null
        })
      }

    } else {
      res.json({
        error: "enter createdBy",
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

async function searchsingleproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.productid)) {
      const getProduct = await Product.findOne({ _id: req.body.productid }).lean()
      // console.log(getProduct);
      if (getProduct !== null && getProduct.isactive === true) {
        res.json({
          error: null,
          data: {
            ...getProduct
          }
        })
      } else {
        res.json({
          error: "product dosen't exist",
          data: null
        })
      }
    } else {
      res.json({
        error: "enter productid",
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


async function searchproducts(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.searchfield)) {
      // Product.createIndexe({name:"text",title:"text"});
      var perpage = 10
      const searchResult = await Product.find({
        $text: {
          $search: req.body.searchfield
        }
      }).limit(perpage).lean()
      if (searchResult !== null) {
        res.json({
          error: null,
          data: searchResult
        })
      } else {
        res.json({
          error: "enter valid search field",
          data: null
        })
      }
    } else {
      res.json({
        eroor: "enter search field",
        data: null
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: "someting went wrong",
      data: null
    })
  }
}

async function fetchproductinformation(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.category)) {

      const matchObject = {}
      matchObject.category = req.body.category
      if (isNullorUndefinedorEmpty(req.body.subcategory)) {
        matchObject.subcategory = req.body.subcategory
      }
      if (isNullorUndefinedorEmpty(req.body.leafcategory)) {
        matchObject.leafcategory = req.body.leafcategory
      }
      const fetchproductinformation = await Product.aggregate([{
        $match: matchObject
      }])
      //console.log(fetchproductinformation);
      res.json({
        error: null,
        data: fetchproductinformation
      })
    }
  } catch (error) {
    res.json({
      error: "something went wrong",
      data: null
    })
  }
}


async function listofproducts(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.pricefilter)) {
      var perpage = 10;
      let page = 1;
      let asc = 1;
      if (isNullorUndefinedorEmpty(req.query.page)) page = req.query.page

      if (req.body.pricefilter.toString() == "lowtohigh") asc = 1
      if (req.body.pricefilter.toString() == "hightolow") asc = -1;

      const searchResult = await Product.aggregate([
        { $sort: { price: asc } },
        { $skip: (page - 1) * perpage },
        { $limit: perpage },
        {
          $lookup: {
            from: "customerreviews",
            localField: "_id",
            foreignField: "productid",
            as: "ProductReview"
          }
        }
      ])

      //console.log(searchResult)
      if (searchResult !== null) {
        res.json({
          error: null,
          data: searchResult
        })
      } else {
        res.json({
          error: "someting went wrong",
          data: null
        })
      }
    } else if (isNullorUndefinedorEmpty(req.body.searchfield)) {
      var perpage = 10;
      let page = 1;
      if (isNullorUndefinedorEmpty(req.query.page)) page = req.query.page
      const searchResult = await Product.aggregate([
        { $match: { $text: { $search: req.body.searchfield } } },
        { $skip: (page - 1) * perpage },
        { $limit: perpage },
        {
          $lookup: {
            from: "customerreviews",
            localField: "_id",
            foreignField: "productid",
            as: "ProductReview"
          }
        }
      ])
      console.log(searchResult)
      if (searchResult !== null) {
        res.json({
          error: null,
          data: searchResult
        })
      }

    } else if (isNullorUndefinedorEmpty(req.body.category)) {

      var perpage = 2;
      let page = 1;
      if (isNullorUndefinedorEmpty(req.query.page)) page = req.query.page
      const matchObject = {}
      matchObject.category = req.body.category

      if (isNullorUndefinedorEmpty(req.body.subcategory)) {
        matchObject.subcategory = req.body.subcategory
      }
      if (isNullorUndefinedorEmpty(req.body.leafcategory)) {
        matchObject.leafcategory = req.body.leafcategory
      }
      let asc = 1;
      if (isNullorUndefinedorEmpty(req.body.pricefilter)) {
        if (req.body.pricefilter == "lowtohigh") {
          asc = 1;
        }
        if (req.body.pricefilter == "hightolow") {
          asc = -1;
        }
      }
      const fetchproductinformation = await Product.aggregate([
        { $match: matchObject },
        { $sort: { price: asc } },
        { $skip: (page - 1) * perpage },
        { $limit: perpage },
        {
          $lookup: {
            from: "customerreviews",
            localField: "_id",
            foreignField: "productid",
            as: "ProductReview"
          }
        }

      ])
      // console.log(fetchproductinformation);
      if (fetchproductinformation !== null) {
        res.json({
          error: null,
          data: fetchproductinformation
        })
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: "someting went wrong",
      data: null
    })
  }
}


async function metalprice(req, res) {
  const options = {
    method: 'GET',
    url: 'https://live-metal-prices.p.rapidapi.com/v1/latest/XAU,XAG,PA,PL,GBP,EUR/INR',
    headers: {
      'X-RapidAPI-Key': '0c26d728d5msh69261396ad1263ep163180jsn6738e977e13a',
      'X-RapidAPI-Host': 'live-metal-prices.p.rapidapi.com'
    }
  }
  let searchResult = await axios.request(options)
  let resu = searchResult.data.rates
  //this result gies us the price for one ounce
  if (resu != null) {
    res.json({
      error: null,
      data: resu
    })
  } else {
    res.json({
      error: "enter valid search field",
      data: null
    })
  }
}

async function recentlyaddedproducts(req, res) {
  let page = 1;
  if (isNullorUndefinedorEmpty(req.query.page)) page = req.query.page
  var perpage = 2;
  let prodnumber = (page - 1) * perpage;
  if (prodnumber < 100) {
    const fetchrecently = await Product.find().sort({ createdAt: -1 }).skip(prodnumber).limit(perpage)
    if (fetchrecently != null) {
      res.json({
        error: null,
        data: fetchrecently
      })
    } else {
      res.json({
        error: "something went wrong",
        data: null
      })
    }
  } else {

    res.json({
      error: "something went wrong",
      data: null
    })
  }
}

async function fetchallcategoriesproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.userid)) {
      const finduser = await User.findOne({ _id: req.body.userid }).lean()
      if (finduser !== null && finduser.isSeller === true) {
        // const findproductcategories = await Product.find({createdBy:req.body.userid}).lean()
        const findprodcat = await Product.distinct("category", { createdBy: req.body.userid })
        res.json({
          error: null,
          data: findprodcat
        })
      } else {
        res.json({
          error: "enter valid user",
          data: null
        })
      }
    } else {
      res.json({
        error: "enter valid parameters",
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

async function fetchallsubcategoriesproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.userid)) {
      const finduser = await User.findOne({ _id: req.body.userid }).lean()
      if (finduser !== null && finduser.isSeller === true) {
        // const findproductcategories = await Product.find({createdBy:req.body.userid}).lean()
        const findprodsubcat = await Product.distinct("subcategory", { createdBy: req.body.userid })
        res.json({
          error: null,
          data: findprodsubcat
        })
      } else {
        res.json({
          error: "enter valid user",
          data: null
        })
      }
    } else {
      res.json({
        error: "enter valid parameters",
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


async function fetchsellercategory(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.category)) {

      const finduser = await User.findOne({ _id: req.body.userid }).lean()
      if (finduser !== null && finduser.isSeller === true) {
        const prodcategory = await Product.find({ createdBy: req.body.userid, category: req.body.category }).lean()
        if (prodcategory != null) {
          res.json({
            error: null,
            data: prodcategory
          })
        }
        else {

          res.json({
            error: "something went wrong",
            data: null
          })
        }

      } else {
        res.json({
          error: "Please Enter correct userid",
          data: null
        })
      }
    }
  } catch (error) {
    res.json({
      error: "something went wrong",
      data: null
    })
  }
}

async function fetchsellersubcategory(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.subcategory)) {

      const finduser = await User.findOne({ _id: req.body.userid }).lean()
      if (finduser !== null && finduser.isSeller === true) {

        const prodcategory = await Product.find({ createdBy: req.body.userid, subcategory: req.body.subcategory }).lean()
        if (prodcategory != null) {
          res.json({
            error: null,
            data: prodcategory
          })
        }
        else {

          res.json({
            error: "something went wrong",
            data: null
          })
        }

      } else {
        res.json({
          error: "Please Enter correct userid",
          data: null
        })
      }
    }
  } catch (error) {
    res.json({
      error: "something went wrong",
      data: null
    })
  }
}


async function countsellerproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.userid)) {

      const finduser = await User.findOne({ _id: req.body.userid }).lean()
      if (finduser !== null && finduser.isSeller === true) {

        const fetchsellerproduct = await Product.find({ createdBy: req.body.userid }).count()

        res.json({
          error: null,
          data: fetchsellerproduct
        })
      }else{

        res.json({
          error: "User Incorrect",
          data: null
        })
      }

    } else {
      res.json({
        error: "Zero Product Found",
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
  createproduct,
  deleteproduct,
  singleproduct,
  getproducts,
  searchproducts,
  searchsingleproduct,
  updateproduct,
  fetchproductinformation,
  listofproducts,
  metalprice,
  recentlyaddedproducts,
  fetchallcategoriesproduct,
  fetchallsubcategoriesproduct,
  fetchsellercategory,
  fetchsellersubcategory,
  countsellerproduct
}