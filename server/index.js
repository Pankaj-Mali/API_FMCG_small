const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const secrete = "pankaj@98+27*3"

const app = express();
mongoose.connect('mongodb://0.0.0.0/FMCG ', (e) => {
   (e) ? console.log(e.message) : console.log("mongoose is connected")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());



app.get("/", async (req, res) => {
   try {

      return res.status(200).send("this works")
   } catch (e) {
       if (e) return res.status(400).json({
           message: e.message
       })
   }
})


app.listen(8080, (e) => {
   (e) ? console.log(e.message) : console.log("server is up at 8080")
})