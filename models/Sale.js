//defining our schema
const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
    ProductName:{
        type:String,
        trim:true,
    },
    Quantity:{
        type:Number,
        trim:true,
    },
    saleDate:{
       type:String,
       trim:true
    },
    PriceperUnit:{
        type:Number,
        trim:true,
    },
    CustomerName:{
        type:String,
        trim:true,
    },
})
module.exports = mongoose.model("Sale", SaleSchema);