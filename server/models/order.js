const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product_name : {type:String , required:true},
    user_id : {type:Schema.Types.ObjectId, ref:"User", required:true},
    product_id :{type:Schema.Types.ObjectId, ref:"Product", required:true},
    deleveryAddress: {type:String , required:true},
    status : {type:String , required:true , default: "placed"},
    quantyti:{type:Number},
    price:{type:Number}
});

const order = mongoose.model("Order" , orderSchema);

module.exports= order;