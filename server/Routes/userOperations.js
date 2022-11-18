const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user")
const product = require("../models/product");
const order = require("../models/order");
const cart = require("../models/cart")

const router = express.Router();
const secrete = "pankaj@98+27*3";

// to see all products

router.get("/allproduct", async (req, res) => {

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData != null) {
            const skipNumber = req.query.page * req.query.limit
           let  data = await product.find().skip(skipNumber).limit(req.query.limit)
           return res.status(200).json({
            data:data
           })
        } else {

            return res.status(400).json({
                message:"USER IS NOT AUTHORISED"
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
});

// search product by type

router.get("/product/:type", async (req, res) => {

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData != null) {
            const skipNumber = req.query.page * req.query.limit
           let  data = await product.find({product_type : req.params.type}).skip(skipNumber).limit(req.query.limit)
           return res.status(200).json({
            data:data
           })
        } else {

            return res.status(400).json({
                message:"USER IS NOT AUTHORISED"
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
});

// to serch product by its name


router.get("/product/:name", async (req, res) => {

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData != null) {
           let  data = await product.find({product_name : req.params.name})
           return res.status(200).json({
            data:data
           })
        } else {

            return res.status(400).json({
                message:"USER IS NOT AUTHORISED"
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
});



module.exports = router