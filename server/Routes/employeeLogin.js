const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const employee = require("../models/employee");

const router = express.Router();
const secrete = "pankaj@98+27*3";



router.post("/login",async(req,res)=>{
  
 try{

    const employeeID = req.body.employeeID;
    const password = req.body.password;
    const employeeData = await employee.findOne({employeeId:employeeID})
    if(employeeData != null){
        const input = await bcrypt.compare(password , employeeData.password);

        if(input){
            const token =  jwt.sign({
                exp: Math.floor(Date.now()/100)+(60*60*9) ,
                data:employeeData._id
            },secrete)

         res.status(200).json({
                token : token,
                userName: employeeID
                })
        }else {
          return  res.status(400).json({
                message : "wrong password"
                })
        }
    }else {
      return  res.status(400).json({
            message : "employeeID dont match ==> CONTACT TO ADMIN"
            })
    }
 }catch(e){

    res.status(400).json({
       res:e.message
    })
 }
})


module.exports= router