const userDetailsDeletedrouter = require("express").Router();
const bodyParser = require("body-parser");
const loginUsers = require("../models/Users");


userDetailsDeletedrouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
userDetailsDeletedrouter.delete("/:_id", (req,res)=>{
    console.log(req.params._id);
    var _id = req.params.id;
    loginUsers.get().collection('menu', function (err, col) {
     col.deleteOne({_id: new mongodb.ObjectID(_id)});
    });
    res.json({ success: id })

});

module.exports=userDetailsDeletedrouter;