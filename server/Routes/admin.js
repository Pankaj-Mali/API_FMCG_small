const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const employee = require("../models/employee");
const user = require("../models/user");

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

            //this will confirm that the one is admin or not
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
});

// only the admin can see list of all customers or users

router.get("/userList", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const adminData = await employee.findOne({ _id: decoded.data })

        if (adminData != null) {
            let role = adminData.role.toLocaleLowerCase();

            //this will confirm that the one is admin or not

            if (role === "admin") {

                let data = await user.find();

                return res.status(200).json({
                    response: data
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO SEE USER LIST"
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
});

// search user by its user Id

router.get("/user/:userId", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const adminData = await employee.findOne({ _id: decoded.data })

        if (adminData != null) {
            let role = adminData.role.toLocaleLowerCase();

            //this will confirm that the one is admin or not

            if (role === "admin") {

                let data = await user.findById(req.params.userId);

                return res.status(200).json({
                    response: data
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO SEE USER"
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
});

// search user by its emailId

router.get("/user/:email", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const adminData = await employee.findOne({ _id: decoded.data })

        if (adminData != null) {
            let role = adminData.role.toLocaleLowerCase();

            //this will confirm that the one is admin or not

            if (role === "admin") {

                let data = await user.find({ email: req.params.email })

                return res.status(200).json({
                    response: data
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO SEE USER"
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
});

// to see employee list

router.get("/employeeLIst", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const adminData = await employee.findOne({ _id: decoded.data })

        if (adminData != null) {
            let role = adminData.role.toLocaleLowerCase();

            //this will confirm that the one is admin or not

            if (role === "admin") {

                let data = await employee.find()

                return res.status(200).json({
                    response: data
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO SEE EMPLOYEE LIST"
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
});

//to search employee by employeeId

router.get("/employee/:employeeId", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const adminData = await employee.findOne({ _id: decoded.data })

        if (adminData != null) {
            let role = adminData.role.toLocaleLowerCase();

            //this will confirm that the one is admin or not

            if (role === "admin") {

                let data = await employee.find({ employeeId: req.params.employeeId });

                return res.status(200).json({
                    response: data
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO SEE EMPLOYEE "
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
});

// remove employee 

router.get("/employee/:employeeId", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const adminData = await employee.findOne({ _id: decoded.data })

        if (adminData != null) {
            let role = adminData.role.toLocaleLowerCase();

            //this will confirm that the one is admin or not

            if (role === "admin") {

                let data = await employee.deleteOne({ employeeId: req.params.employeeId });

                return res.status(200).json({
                    response: data
                })
            } else {
                return res.status(400).json({
                    res: "YOU ARE NOT AUTHORISED TO REMOVE EMPLOYEE "
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
});

module.exports = router