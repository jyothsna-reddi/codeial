const express = require("express");

const router = express.Router();

const usercontroller = require("../Controller/user_controller");

router.get("/",usercontroller.users);
router.get("/signup",usercontroller.signup);
router.get("/login",usercontroller.login);
router.get("/profile",usercontroller.profile);
router.get("/create-session",usercontroller.createSession);

//above is same as app.get("/url",function(req,res){
//     .....  heree function we get from controller
// })
module.exports = router;