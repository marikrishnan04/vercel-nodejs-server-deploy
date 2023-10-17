const userDetailsrouter = require("express").Router();
const bodyParser = require("body-parser");
const loginUsers = require("../models/Users");


userDetailsrouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
userDetailsrouter.get("/", async (req, res) => {
    loginUsers
    .find()
    .then((loginUsers) => res.json(loginUsers))
    .catch((err) => res.status(400).json("error:" + err));
});

module.exports=userDetailsrouter;