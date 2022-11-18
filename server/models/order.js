const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product_name : {type:String , required:true},
    customer_id : {type:Schema.Types.ObjectId, ref:"Customer", required:true},
    product_id :{type:Schema.Types.ObjectId, ref:"Product", required:true},
    quantyti:{type:Number}
})

const order = mongoose.model("Order" , orderSchema);

module.exports= order;