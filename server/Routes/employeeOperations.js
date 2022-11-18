const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const employee = require("../models/employee");
const product = require("../models/product")
const router = express.Router();
const secrete = "pankaj@98+27*3";


// Add new product 
router.post("/addNewProduct", async (req, res) => {

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const employeeData = await employee.findOne({ _id: decoded.data })

        if (employeeData != null) {
            let role = employeeData.role.toLocaleLowerCase();
            //this will confirm that the one is from manegement or not
            if (role === "manegement") {
                //add new product to the collection
                const data = await product.create(req.body);
                return res.status(200).json({
                    res: data,
                    data: req.body,
                    message: "product is added"
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO ADD NEW PRODUCT"
                })
            }
        } else {

            return res.status(400).json({
                res: e.message
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
})

//Delete the product
router.post("/deleteProduct/:productId", async (req, res) => {

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const employeeData = await employee.findOne({ _id: decoded.data })

        if (employeeData != null) {
            let role = employeeData.role.toLocaleLowerCase();
            //this will confirm that the one is from manegement or not
            if (role === "manegement") {
                //add new product to the collection
                const data = await product.findByIdAndDelete(req.params.productId)
                return res.status(200).json({
                    res: data,
                    data: req.body,
                    message: "product is deleted"
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO DELETE PRODUCT"
                })
            }
        } else {

            return res.status(400).json({
                res: e.message
            })

        }
    } catch (e) {

        res.status(400).json({
            res: e.message
        })
    }
})


module.exports = router