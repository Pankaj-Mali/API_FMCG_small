const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const google = require("./Routes/userGoogleLogin")
const userLoginResister= require("./Routes/userEntry")
const employeeLogin = require("./Routes/employeeLogin")

const secrete = "pankaj@98+27*3"

const app = express();
mongoose.connect('mongodb://0.0.0.0/FMCG ', (e) => {
   (e) ? console.log(e.message) : console.log("mongoose is connected")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// if user login or register with google
app.use("/api/user/google" , google);

// if user login or register without google
app.use("/api/landingPage/user" , userLoginResister);

// for employee login
app.use("/api/landingPage/employee/" , employeeLogin);


app.listen(8080, (e) => {
   (e) ? console.log(e.message) : console.log("server is up at 8080")
})