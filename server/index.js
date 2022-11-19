const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// the routes
const google = require("./Routes/userGoogleLogin")
const userLoginResister= require("./Routes/userEntry")
const employeeLogin = require("./Routes/employeeLogin")
const employeeOperations = require("./Routes/employeeOperations")
const adminOperations = require("./Routes/admin");
const userOperations = require("./Routes/userOperations");


const secrete = "pankaj@98+27*3"

const app = express();
mongoose.connect('mongodb://0.0.0.0/FMCG ', (e) => {
   (e) ? console.log(e.message) : console.log("mongoose is connected")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const options ={
   definition:{
      openapi:"3.0.0",
      info:{
         title:"api for fmcg",
         version:"1.0.0"
      },
      servers:[
         {
            url:"http://localhost:8080"
         }
      ]
   },
   apis:[
      "./index.js","./Routes/userGoogleLogin" , "./Routes/userEntry" ,"./Routes/employeeLogin","./Routes/employeeOperations",
      "./Routes/admin","./Routes/userOperations"
   ]
}


const swaggerSpec = swaggerJSDoc(options)

//swagger url
app.use("/api-swagger", swaggerUi.serve , swaggerUi.setup(swaggerSpec))
// if user login or register with google
app.use("/api/user/google" , google);

// if user login or register without google
app.use("/api/landingPage/user" , userLoginResister);

// for employee login
app.use("/api/landingPage/employee" , employeeLogin);

// operations done by employee
app.use("/api/employee" , employeeOperations);

//for the operations done by admin only
app.use("api/employee/admin" , adminOperations);

// user operationas
app.use("/api/home/user" , userOperations )

//all swagger operations


/**
 * @swagger
 * /api/employee/admin/userList/:
 *  get:
 *    summary: to see list of all users
 *    description: only employee with role admin is able to do this
 */

/**
 * @swagger
 * /api/employee/admin/user/{userId}/:
 *  get:
 *    summary: to see perticular users by his id
 *    description: only employee with role admin is able to do this
 *    responses:
 *         200:
 *           description: user info
 *         400: 
 *           description: show error message
 */

/**
 * @swagger
 * /api/employee/admin/user/{email}/:
 *  get:
 *    summary: to see perticular users by his email
 *    description: only employee with role admin is able to do this
 *    responses:
 *         200:
 *           description: user info
 *         400: 
 *           description: show error message
 */

/**
 * @swagger
 * /api/employee/admin/employeeLIst/:
 *  get:
 *    summary: to see list of all employees
 *    description: only employee with role admin is able to do this
 *    responses:
 *         200:
 *           description: employee list
 *         400: 
 *           description: show error message
 */

/**
 * @swagger
 * /api/employee/admin/employee/{employeeId}:
 *  get:
 *    summary: to search perticular employee
 *    description: only employee with role admin is able to do this
 *    responses:
 *         200:
 *           description: employee info
 *         400: 
 *           description: show error message
 */

// employee operations

/**
 * @swagger
 * /api/employee/allOrders:
 *  get:
 *    summary: to see all orders by all users
 *    description: only employee with role manegement is able to do this
 *    responses:
 *         200:
 *           description: order list
 *         400: 
 *           description: show error message
 */

/**
 * @swagger
 * /api/employee/orders/{satus}:
 *  get:
 *    summary: to see all orders by all users by there status
 *    description: only employee with role manegement is able to do this
 *    responses:
 *         200:
 *           description: order list
 *         400: 
 *           description: show error message
 */

// user operations
app.listen(8080, (e) => {
   (e) ? console.log(e.message) : console.log("server is up at 8080")
})

