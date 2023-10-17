const loginRouter = require("express").Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const loginUsers = require("../models/Users");




loginRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// login api.......................

loginRouter.post("/", async (req, res) => {
    console.log("req", req.body.email);
  console.log(loginUsers);
  try {
    var loginUser = await loginUsers.findOne({ email: req.body.email });
    if (!loginUser) {
      return res.status(400).send("user not reg ");
    }
    var vailPassword = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (!vailPassword) {
      return res.send("password incorrect");
    }
    res.send("login success!!!");
  } catch (err) {
    res.status(400).json("error:" + err);
  }
});

module.exports=loginRouter;