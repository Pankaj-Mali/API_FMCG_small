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
            let data = await product.find().skip(skipNumber).limit(req.query.limit)
            return res.status(200).json({
                data: data
            })
        } else {

            return res.status(400).json({
                message: "USER IS NOT AUTHORISED"
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
            let data = await product.find({ product_type: req.params.type }).skip(skipNumber).limit(req.query.limit)
            return res.status(200).json({
                data: data
            })
        } else {

            return res.status(400).json({
                message: "USER IS NOT AUTHORISED"
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
            let data = await product.find({ product_name: req.params.name })
            return res.status(200).json({
                data: data
            })
        } else {

            return res.status(400).json({
                message: "USER IS NOT AUTHORISED"
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
});

// add the product to cart 

router.post("/cart/add", async (req, res) => {

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData != null) {
            let data = await cart.create(req.body)
            return res.status(200).json({
                data: data
            })
        } else {

            return res.status(400).json({
                message: "USER IS NOT AUTHORISED"
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
});

// see elements in the cart

router.get("/cart/allCartItems", async (req, res) => {

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData != null) {
            let data = await cart.find()
            return res.status(200).json({
                data: data
            })
        } else {

            return res.status(400).json({
                message: "USER IS NOT AUTHORISED"
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
});

//place the order 

router.post("/order/placeOrder", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData != null) {
            const productinfo = await product.findById(req.body.product_id)

            if (productinfo.quantyti < req.body.quantyti) {
                return res.status(200).json({
                    message: "out of stock"
                })
            }

            //user reference to order
            req.body.user_id = decoded.data

            // this place order
            const data = await order.create(req.body);

            // once the order is cerated this will update the available quantity of product

            const updateQuantyti = await product.findByIdAndUpdate(req.body.product_id, { quantyti: quantyti })

            return res.status(200).json({
                order: data,
                message: "ORSER PLACED"
            })
        } else {

            return res.status(400).json({
                message: "USER IS NOT AUTHORISED"
            })

        }

    } catch (e) {
        res.status(400).json({
            res: e.message
        })
    }
});

// to see all orders of user

router.get("/order/allOrders", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData != null) {
            const data = await order.find({user_id : decoded.data})

            return res.status(200).json({
                order: data
            })
        } else {

            return res.status(400).json({
                message: "USER IS NOT AUTHORISED"
            })

        }

    } catch (e) {
        res.status(400).json({
            res: e.message
        })
    }
});



module.exports = router