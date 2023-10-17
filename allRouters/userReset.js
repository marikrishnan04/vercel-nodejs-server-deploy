
const resetRouter = require("express").Router();
const bodyParser = require("body-parser");
const loginUsers = require("../models/Users");
const Token = require("../models/token");
const Joi = require("joi");
const forgotRouter = require("./userForgotPassword");
const jwt = require("jsonwebtoken");


resetRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// resetRouter.post("/:userId/:token", async (req, res) => {
//     console.log(req.params);
//     try {
//       const schema = Joi.object({ password: Joi.string().required() });
//       const { error } = schema.validate(req.body);
//       if (error) return res.status(400).send(error.details[0].message);
  
//       const loginUser = await loginUsers.findById(req.params.userId);
//       if (!loginUser) return res.status(400).send("invalid link or expired user");
  
//       const token = await Token.findOne({
//           userId: loginUser._id,
//           token: req.params.token,
//       });
//       if (!token) return res.status(401).send("Invalid link or expired token");
  
//       loginUser.password = req.body.password;
//       await loginUser.save();
    
  
//       res.send("password reset sucessfully.");
//   } catch (error) {
//       res.send("An error occured");
//       console.log(error);
//   }
//   });
  
  
  
resetRouter.post("/:userId/:token", async (req, res) => {
  console.log(req.params);
  try {
    const { token } = req.params.token;
     const newtoken=token;
     newtoken.save();
    if (newtoken) {
      jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          console.error('JWT Verification Error:', err);
          return res.status(400).json({ error: 'Invalid token' });
        }
        // Rest of the code
      
      
        loginUsers.findOne({ resetLink: token }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({ error: 'User with this token does not exist' });
          }

          user.password = req.body.password;
          user.save((saveError, result) => {
            if (saveError) {
              return res.status(400).json({ error: 'Unable to save the new password' });
            } else {
              return res.status(200).json({ message: 'Password has been updated successfully' });
            }
          });
        });
      });
    } else {
      return res.status(401).json({ error: 'Token is missing or invalid' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  module.exports=resetRouter;