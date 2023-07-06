const ListingAndUpdateProduct = require('../../models/ListingAndUpdateProduct')
const Product = require('../../models/Product')
const User = require('../../models/User')
const { isNullorUndefinedorEmpty } = require('../../utility/util')


async function uploadsingleproduct(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.brandName) && isNullorUndefinedorEmpty(req.body.title) && isNullorUndefinedorEmpty(req.body.description) && isNullorUndefinedorEmpty(req.body.weight) && isNullorUndefinedorEmpty(req.body.mainImage) && isNullorUndefinedorEmpty(req.body.additionalImage1) && isNullorUndefinedorEmpty(req.body.price) && isNullorUndefinedorEmpty(req.body.quantity) && isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.category) && isNullorUndefinedorEmpty(req.body.country) && isNullorUndefinedorEmpty(req.body.operations)) {
            // console.log("DONE")
            //Check if User Exists
            const getuser = await User.findOne({ _id: req.body.userid }).lean()
            // console.log(req.body.userid,getuser);
            if (getuser !== null && getuser.isSeller === true) {
                //Store Prouct Info
                const createProduct = new ListingAndUpdateProduct({
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
                    operations: req.body.operations
                    // isapproved:isNullorUndefinedorEmpty(req.body.isapproved)?req.body.isapproved:false,
                    // approvedby:isNullorUndefinedorEmpty(req.body.approvedby)?req.body.approvedby:null                    

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
        res.json({
            error: "something went wrong",
            data: null
        })
    }
}

async function uploadproducts(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.products) && isNullorUndefinedorEmpty(req.body.userid)) {
            const getuser = await User.findOne({ _id: req.body.userid })
            // console.log(getuser,req.body.userid);
            if (getuser !== null && getuser.isSeller === true) {
                const productsLength = req.body.products.length
                let validProducts = []
                let invalidProducts = []
                createdBy = req.body.createdBy
                for (let i = 0; i < productsLength; i++) {
                    // console.log(req.body.products[i]);
                    if (isNullorUndefinedorEmpty(req.body.products[i].brandName) &&
                        isNullorUndefinedorEmpty(req.body.products[i].title) &&
                        isNullorUndefinedorEmpty(req.body.products[i].description) &&
                        isNullorUndefinedorEmpty(req.body.products[i].weight) &&
                        isNullorUndefinedorEmpty(req.body.products[i].mainImage) &&
                        isNullorUndefinedorEmpty(req.body.products[i].additionalImage1) &&
                        isNullorUndefinedorEmpty(req.body.products[i].price) &&
                        isNullorUndefinedorEmpty(req.body.products[i].quantity) &&
                        isNullorUndefinedorEmpty(req.body.products[i].category) &&
                        isNullorUndefinedorEmpty(req.body.products[i].options)
                    ) {
                        req.body.products[i].createdBy = req.body.userid
                        validProducts.push(req.body.products[i])
                    } else {
                        invalidProducts.push(req.body.products[i])
                    }
                }
                const insertProducts = await ListingAndUpdateProduct.insertMany(validProducts);
                // const saveProducts = await insertProducts.save();

                res.json({
                    error: `inserted ${validProducts.length} products`,
                    validData: validProducts,
                    invalidData: invalidProducts
                })
            } else {
                res.json({
                    error: "enter valid user",
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

async function singleproductupdate(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.productid) && isNullorUndefinedorEmpty(req.body.userid)) {
            const getuser = await User.findOne({ _id: req.body.userid })

            const getproduct = await Product.findOne({
                _id: req.body.productid
            }).lean()

            if (getproduct !== null && getuser.isSeller == true) {
                const createProduct = new ListingAndUpdateProduct({
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
                    isapproved: isNullorUndefinedorEmpty(req.body.isapproved) ? req.body.isapproved : false,
                    approvedby: isNullorUndefinedorEmpty(req.body.approvedby) ? req.body.approvedby : null
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
            }
        } else {
            res.json({
                error: 'Provide all Mandatory Fields',
                data: null,
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Something Went Wrong',
            data: null,
        })
    }
}


async function bulkproductupdate(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.products)) {
            const getuser = await User.findOne({ _id: req.body.userid })

            let insertedProducts = []

            if (getuser !== null && getuser.isSeller === true) {
                const productsLength = req.body.products.length

                for (let i = 0; i < productsLength; i++) {
                    const getproduct = await Product.findOne({ _id: req.body.products[i].productid }).lean()

                    if (getproduct !== null) {
                        const createProduct = new ListingAndUpdateProduct({
                            brandName: req.body.products[i].brandName,
                            title: req.body.products[i].title,
                            description: req.body.products[i].description,
                            bulletPoints: req.body.products[i].bulletPoints,
                            height: req.body.products[i].height,
                            width: req.body.products[i].width,
                            length: req.body.products[i].length,
                            weight: req.body.products[i].weight,
                            mainImage: req.body.products[i].mainImage,
                            additionalImage1: req.body.products[i].additionalImage1,
                            additionalImage2: req.body.products[i].additionalImage2,
                            additionalImage3: req.body.products[i].additionalImage3,
                            additionalImage4: req.body.products[i].additionalImage4,
                            additionalImage5: req.body.products[i].additionalImage5,
                            price: req.body.products[i].price,
                            quantity: req.body.products[i].quantity,
                            category: req.body.products[i].category,
                            createdBy: req.body.products[i].userid,
                            subcategory: req.body.products[i].subcategory,
                            leafcategory: req.body.products[i].leafcategory,
                            country: req.body.products[i].country,
                            isapproved: isNullorUndefinedorEmpty(req.body.products[i].isapproved) ? req.body.products[i].isapproved : false,
                            approvedby: isNullorUndefinedorEmpty(req.body.products[i].approvedby) ? req.body.products[i].approvedby : null
                        })
                        const saveProduct = await createProduct.save()
                        insertedProducts.push(saveProduct)
                    }
                }
                res.json({
                    error: `inserted ${insertedProducts.length} products`,
                    insertedData: insertedProducts
                })

            } else {
                res.json({
                    error: 'invalid User',
                    data: null,
                })
            }
        } else {
            res.json({
                error: 'Provide all Mandatory Fields',
                data: null,
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Something Went Wrong',
            data: null,
        })
    }
}

async function fetchalllistingproducts(req, res) {
    try {
        const alllistingproducts = await ListingAndUpdateProduct.find({ isapproved: false }).lean()
        let validproducts = []
        // console.log(alllistingproducts);
        for (let i = 0; i < alllistingproducts.length; i++) {
            if (alllistingproducts[i].isapproved === false) {
                const { brandName, title, description, bulletPoints, height, width, length, weight, mainImage, additionalImage1, additionalImage2, additionalImage3, additionalImage4, additionalImage5, createdBy, price, quantity, category, subcategory, leafcategory, country } = alllistingproducts[i]
                const newproduct = new Product({
                    brandName: brandName,
                    title: title,
                    description: description,
                    bulletPoints: bulletPoints,
                    height: height,
                    width: width,
                    length: length,
                    weight: weight,
                    mainImage: mainImage,
                    additionalImage1: additionalImage1,
                    additionalImage2: additionalImage2,
                    additionalImage3: additionalImage3,
                    additionalImage4: additionalImage4,
                    additionalImage5: additionalImage5,
                    createdBy: createdBy,
                    price: price,
                    quantity: quantity,
                    category: category,
                    subcategory: subcategory,
                    leafcategory: leafcategory,
                    country: country
                })
                validproducts.push(newproduct)
            }
        }
        // console.log(validproducts);
        const updatelistingproduct = await ListingAndUpdateProduct.updateMany({ isapproved: false }, { $set: { isapproved: true, approvedby: "ADMIN" } })
        const savevalidproducts = await Product.insertMany(validproducts)
        // console.log(savevalidproducts);
        res.json({
            error: null,
            data: savevalidproducts
        })

    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null
        })
    }
}


async function storeorupdateproduct(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.productid)) {
            const findproduct = await ListingAndUpdateProduct.findOne({ _id: req.body.productid }).lean()
            if (findproduct === null) {
                res.json({
                    error: "enter valid productid",
                    data: null
                })
            }
            if (findproduct !== null) {
                const updateproduct = await ListingAndUpdateProduct.updateOne(
                    { _id: req.body.productid },
                    {
                        $set: {
                            brandName: isNullorUndefinedorEmpty(req.body.brandName) ? req.body.brandName : findproduct.brandName,
                            title: isNullorUndefinedorEmpty(req.body.title) ? req.body.title : findproduct.title,
                            description: isNullorUndefinedorEmpty(req.body.description) ? req.body.description : findproduct.description,
                            bulletPoints: isNullorUndefinedorEmpty(req.body.bulletPoints) ? req.body.bulletPoints : findproduct.bulletPoint,
                            height: isNullorUndefinedorEmpty(req.body.height) ? req.body.height : findproduct.height,
                            width: isNullorUndefinedorEmpty(req.body.width) ? req.body.width : findproduct.width,
                            length: isNullorUndefinedorEmpty(req.body.length) ? req.body.length : findproduct.length,
                            weight: isNullorUndefinedorEmpty(req.body.weight) ? req.body.weight : findproduct.weight,
                            mainImage: isNullorUndefinedorEmpty(req.body.mainImage) ? req.body.mainImage : findproduct.mainImage,
                            additionalImage1: isNullorUndefinedorEmpty(req.body.additionalImage1) ? req.body.additionalImage1 : findproduct.additionalImage1,
                            additionalImage2: isNullorUndefinedorEmpty(req.body.additionalImage2) ? req.body.additionalImage2 : findproduct.additionalImage2,
                            additionalImage3: isNullorUndefinedorEmpty(req.body.additionalImage3) ? req.body.additionalImage3 : findproduct.additionalImage3,
                            additionalImage4: isNullorUndefinedorEmpty(req.body.additionalImage4) ? req.body.additionalImage4 : findproduct.additionalImage4,
                            additionalImage5: isNullorUndefinedorEmpty(req.body.additionalImage5) ? req.body.additionalImage5 : findproduct.additionalImage5,
                            price: isNullorUndefinedorEmpty(req.body.price) ? req.body.price : findproduct.price,
                            quantity: isNullorUndefinedorEmpty(req.body.quantity) ? req.body.quantity : findproduct.quantity,
                            category: isNullorUndefinedorEmpty(req.body.category) ? req.body.category : findproduct.category,
                            subcategory: isNullorUndefinedorEmpty(req.body.subcategory) ? req.body.subcategory : findproduct.subcategory,
                            leafcategory: isNullorUndefinedorEmpty(req.body.leafcategory) ? req.body.leafcategory : findproduct.leafcategory,
                            country: isNullorUndefinedorEmpty(req.body.country) ? req.body.country : findproduct.country
                        }
                    }
                )
            }
            if (findproduct !== null) {
                const finduser = await User.findOne({ _id: findproduct.createdBy }).lean()
                if (finduser.isAdmin === true) {
                    const updateprod = await ListingAndUpdateProduct.updateOne({ _id: req.body.productid },
                        {
                            $set: {
                                isapproved: true,
                                approvedby: findproduct.createdBy
                            }
                        }
                    )
                    const findprod = await ListingAndUpdateProduct.findOne({ _id: req.body.productid }).lean()
                    const { brandName, title, description, bulletPoints, height, width, length, weight, mainImage, additionalImage1, additionalImage2, additionalImage3, additionalImage4, additionalImage5, createdBy, price, quantity, category, subcategory, leafcategory, country } = findprod
                    const newproduct = new Product({
                        brandName: brandName,
                        title: title,
                        description: description,
                        bulletPoints: bulletPoints,
                        height: height,
                        width: width,
                        length: length,
                        weight: weight,
                        mainImage: mainImage,
                        additionalImage1: additionalImage1,
                        additionalImage2: additionalImage2,
                        additionalImage3: additionalImage3,
                        additionalImage4: additionalImage4,
                        additionalImage5: additionalImage5,
                        createdBy: createdBy,
                        price: price,
                        quantity: quantity,
                        category: category,
                        subcategory: subcategory,
                        leafcategory: leafcategory,
                        country: country
                    })
                    const saveprod = await newproduct.save()
                }
            }
            const findupdatedproduct = await ListingAndUpdateProduct.findOne({ _id: req.body.productid }).lean()
            res.json({
                error: null,
                data: {
                    ...findupdatedproduct,
                    createdAt: findupdatedproduct.createdAt.toISOString(),
                    updatedAt: findupdatedproduct.updatedAt.toISOString()
                }
            })
        } else {
            if (isNullorUndefinedorEmpty(req.body.brandName) && isNullorUndefinedorEmpty(req.body.title) && isNullorUndefinedorEmpty(req.body.description) && isNullorUndefinedorEmpty(req.body.weight) && isNullorUndefinedorEmpty(req.body.mainImage) && isNullorUndefinedorEmpty(req.body.additionalImage1) && isNullorUndefinedorEmpty(req.body.price) && isNullorUndefinedorEmpty(req.body.quantity) && isNullorUndefinedorEmpty(req.body.userid) && isNullorUndefinedorEmpty(req.body.category) && isNullorUndefinedorEmpty(req.body.country) && isNullorUndefinedorEmpty(req.body.operations)) {
                // console.log("DONE")
                //Check if User Exists
                const getuser = await User.findOne({ _id: req.body.userid }).lean()
                // console.log(req.body.userid,getuser);
                if (getuser !== null && getuser.isSeller === true && getuser.isAdmin === true) {
                    //Store Prouct Info
                    const createProduct = new ListingAndUpdateProduct({
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
                        operations: req.body.operations,
                        isapproved: true,
                        approvedby: req.body.userid

                    })
                    const newproduct = new Product({
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
                        createdBy: req.body.userid,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        category: req.body.category,
                        subcategory: req.body.subcategory,
                        leafcategory: req.body.leafcategory,
                        country: req.body.country
                    })
                    const saveprod = await newproduct.save()
                    const saveProduct = await createProduct.save()

                    res.json({
                        error: null,
                        data: {
                            ...saveProduct._doc,
                            createdAt: saveProduct.createdAt.toISOString(),
                            updatedAt: saveProduct.updatedAt.toISOString()
                        }
                    })
                } else if (getuser !== null && getuser.isSeller === true) {

                    //Store Prouct Info
                    const createProduct = new ListingAndUpdateProduct({
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
                        operations: req.body.operations
                        // isapproved:isNullorUndefinedorEmpty(req.body.isapproved)?req.body.isapproved:false,
                        // approvedby:isNullorUndefinedorEmpty(req.body.approvedby)?req.body.approvedby:null                    

                    })
                    const saveProduct = await createProduct.save()
                    res.json({
                        error: null,
                        data: {
                            ...saveProduct._doc,
                            createdAt: saveProduct.createdAt.toISOString(),
                            updatedAt: saveProduct.updatedAt.toISOString()
                        }
                    })

                } else {
                    res.json({
                        error: "enter valid user",
                        data: null
                    })
                }
            } else {
                res.json({
                    error: "enter valid fields",
                    data: null
                })
            }
        }
    } catch (error) {
        res.json({
            error: "something went wrong",
        })
    }
}

async function filterlistingandupdate(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.operations) && isNullorUndefinedorEmpty(req.body.isapproved)) {

            const getproduct = await ListingAndUpdateProduct.find({ operations: req.body.operations, isapproved: req.body.isapproved }).lean()
            // console.log(getproduct);
            if (getproduct !== null) {
                res.json({
                    error: null,
                    data: getproduct
                })
            } else {
                res.json({
                    error: "Product not available",
                    data: null
                })
            }
        } else {
            res.json({
                error: "Provide Mandatory fields",
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

async function alllistingproducts(req, res) {
    try {
        const getproduct = await ListingAndUpdateProduct.find()

        // console.log(getproduct);
        if (getproduct !== null) {
            res.json({
                error: null,
                data: getproduct
            })
        } else {
            res.json({
                error: "No Product available",
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

async function filterlistingandupdate(req, res) {
    try {
        if (isNullorUndefinedorEmpty(req.body.operations) && isNullorUndefinedorEmpty(req.body.isapproved)) {

            const matchObject = {}
            if (isNullorUndefinedorEmpty(req.body.operations)) {
                matchObject.operations = req.body.operations
            }
            if (isNullorUndefinedorEmpty(req.body.isapproved)) {
                matchObject.isapproved = req.body.isapproved
            }
            const getproduct = await ListingAndUpdateProduct.aggregate([{
                $match: {
                    operations: matchObject
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
                    error: "Product not available",
                    data: null
                })
            }

        } else {
            res.json({
                error: "Provide Mandatory fields",
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
    uploadsingleproduct,
    uploadproducts,
    fetchalllistingproducts,
    singleproductupdate,
    bulkproductupdate,
    storeorupdateproduct,
    filterlistingandupdate,
    alllistingproducts
}