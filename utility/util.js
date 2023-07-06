const { request } = require("express")
const Cart = require("../models/Cart")
const CartDetailID = require("../models/CartDetailID")
const ReferenceNumber = require("../models/ReferenceNumber")
const orderedNumber = require("../models/orderedNumber")

const isNullorUndefinedorEmpty = (value) => {
    let isvalid = false
    if(value !== null && value !== undefined && value !== ""){
        isvalid = true
    }
    return isvalid
}

async function fetchFromReferenceNumber(){
    var number = 0
    const fetchRef = await ReferenceNumber.find();
    if(fetchRef.length === 0){
        const saveRef = await ReferenceNumber.insertMany([{referencenumber:0}])
        // const saveRefNum = await saveRef.save()
        // console.log(saveRefNum);
    }else{
        number = fetchRef[0].referencenumber;
        const id = fetchRef[0]._id;
        const updateByOne = await ReferenceNumber.updateOne({_id:id},{$set:{referencenumber:number+1}})
        // const saveUpdate = await updateByOne.save()
        // console.log(saveUpdate);
    }
    return number
}

async function fetchFromOrderedNumber() {
    var number = 0
    const fetchRef = await orderedNumber.find();
    if (fetchRef.length === 0) {
        const saveRef = await orderedNumber.insertMany([{ referencenumber: 0 }])
        // const saveRefNum = await saveRef.save()
        // console.log(saveRefNum);
    } else {
        number = fetchRef[0].referencenumber;
        const id = fetchRef[0]._id;
        const updateByOne = await orderedNumber.updateOne({ _id: id }, { $set: { referencenumber: number + 1 } })
        // const saveUpdate = await updateByOne.save()
        // console.log(saveUpdate);
    }
    return number
}


async function fetchFromCartDetailID(){
    var number = 0
    const fetchRef = await CartDetailID.find();
    if(fetchRef.length === 0){
        const saveRef = await CartDetailID.insertMany([{cartdetailid:0}])
        // const saveRefNum = await saveRef.save()
        // console.log(saveRefNum);
    }else{
        number = fetchRef[0].cartdetailid;
        const id = fetchRef[0]._id;
        const updateByOne = await CartDetailID.updateOne({_id:id},{$set:{cartdetailid:number+1}})
        // const saveUpdate = await updateByOne.save()
        // console.log(saveUpdate);
    }
    return number
}



module.exports = {
    isNullorUndefinedorEmpty,
    fetchFromReferenceNumber,
    fetchFromCartDetailID,
    fetchFromOrderedNumber
}