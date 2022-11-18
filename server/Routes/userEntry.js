const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const secrete = "pankaj@98+27*3";



router.post("/login" ,body("email").isEmail(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "provide valide email" });
    }
 try{

    const email = req.body.email;
    const password = req.body.password;
    const userData = await user.findOne({email:email})
    if(userData != null){
        const input = await bcrypt.compare(password , userData.password);

        if(input){
            const token =  jwt.sign({
                exp: Math.floor(Date.now()/100)+(60*60) ,
                data:userData._id
            },secrete)

         res.status(200).json({
                token : token,
                userName: email
                })
        }else {
          return  res.status(400).json({
                message : "wrong password"
                })
        }
    }else {
      return  res.status(400).json({
            message : "email dont match ==> REGISTER FIRST"
            })
    }
 }catch(e){

    res.status(400).json({
       res:e.message
    })
 }
})

router.post("/register" ,body("email").isEmail(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "provide valide email" });
    }
 try{

    let pass =req.body.password
    pass = await bcrypt.hash(pass , 10)
    req.body.password=pass
    const data =await user.create(req.body)

     return res.status(200).json({
         message:"registration complited"
     })
   
 }catch(e){

    res.status(400).json({
       res:"email exist"
    })
 }
})


module.exports= router