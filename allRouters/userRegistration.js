const regRouter = require("express").Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const loginUsers = require("../models/Users");
const Joi = require("joi");

regRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// registration api...................
regRouter.post("/", async (req, res) => {
 try{
  const { userName, email } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      const password = hashedPassword;
      const newUser = new loginUsers({ userName, password, email });
      newUser
        .save()
        .then(() => res.json("user added success!"))
        .catch((err) => res.status(400).json("error:" + err));
    });
  });
 } catch(err){
  res.send("err");
 }
});

module.exports=regRouter;