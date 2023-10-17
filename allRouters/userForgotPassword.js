
const forgotRouter = require("express").Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const loginUsers = require("../models/Users");
const crypto = require("crypto");
const Joi = require("joi");
const jwt= require('jsonwebtoken');
const Token = require("../models/token");
const sendEmail = require("../models/sendEmail");

forgotRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
forgotRouter.post("/", async (req, res) => {
    console.log("req", req.body.email);
    console.log(loginUsers);
    try {
      const schema = Joi.object({ email: Joi.string().email().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      const loginUser = await loginUsers.findOne({ email: req.body.email });
      if (!loginUser)
        return res.status(400).send("user with given email doesn't exist");
  
        const token = jwt.sign({ userId: loginUser.id},process.env.TOKEN_KEY,{expiresIn:"1h"});
          
  
      // let token = await Token.findOne({ userId: loginUser._id });
      
      // if (!token) {////////////
      //   token = await new Token({
      //     userId: loginUser._id,
      //     token: crypto.randomBytes(7).toString("hex"),
      //   }).save();
      // }
  
      const link = `${process.env.BASE_URL}/password-reset/${loginUser._id}/${token}`;
      await sendEmail(loginUser.email, "Password reset", link);
      res.json({ message: "Password reset email sent" });
    } catch (err) {}
  });


  module.exports=forgotRouter;