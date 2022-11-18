const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name : {type:String , required:true},
    product_type : {type:String , required:true},
    product_price :{type:String , required:true},
    quantyti:{type:Number},
    imageSource:{type:String}
})

const product = mongoose.model("Product" , productSchema);

module.exports= product;