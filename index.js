const express = require('express');
const bodyParser = require('body-parser');
const loginDetails = require('./config/db.confi');
const regRouter = require('./allRouters/userRegistration');
const loginRouter = require('./allRouters/userLogin');
const forgotRouter = require('./allRouters/userForgotPassword');
const resetRouter = require('./allRouters/userReset');
const userDetailsrouter = require('./allRouters/userDetails');
const app=express();
const port= process.env.PORT;
require('dotenv').config();

loginDetails()
app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello world')
  })
app.use("/user/",userDetailsrouter)// view user all details 
app.use("/user/registration",regRouter) //user registration api
app.use("/user/login",loginRouter) // user login api
app.use("/user/forgot-password",forgotRouter) // user forgot api
app.use("/user/reset/",resetRouter)  // user reset api pass that userId token

  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })