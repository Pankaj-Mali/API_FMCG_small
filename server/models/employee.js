const mongoose= require("mongoose");

const Schema= mongoose.Schema

const employeeSchema= new Schema({
    employeeId:{type:String , required: true , unique: true},
    password:{type:String , required: true},
    role:{type:String , required: true}
})

const employee = mongoose. model("Employee" , employeeSchema);

module.exports=employee;