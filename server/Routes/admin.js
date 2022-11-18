const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const employee = require("../models/employee");

const router = express.Router();
const secrete = "pankaj@98+27*3";

// only admin allowed to register new employee

router.post("/registerNewEmployee", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const adminData = await employee.findOne({ _id: decoded.data })

        if (adminData != null) {
            let role = adminData.role.toLocaleLowerCase();

            //this will conform that the one is admin or not
            if (role === "admin") {

                let pass = req.body.password
                pass = await bcrypt.hash(pass, 10)
                req.body.password = pass
                const data = await employee.create(req.body)

                return res.status(200).json({
                    message: "registration complited"
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO REGISTER NEW EMPLOYEE"
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