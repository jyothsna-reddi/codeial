const express = require("express");

const router = express.Router();

const usercontroller = require("../Controller/user_controller");

router.get("/",usercontroller.users);

router.get("/profile",usercontroller.profile);
//above is same as app.get("/url",function(req,res){
//     .....  heree function we get from controller
// })
module.exports = router;