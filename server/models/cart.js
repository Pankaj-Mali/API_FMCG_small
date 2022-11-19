const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id : {type:Schema.Types.ObjectId, ref:"User", required:true},
    product_id :{type:Schema.Types.ObjectId, ref:"Product", required:true},
});

const cart = mongoose.model("Cart" , cartSchema);

module.exports= cart;