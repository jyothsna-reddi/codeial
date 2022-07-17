const { request } = require("express");
const express = require("express");
const passport = require("passport");
const router = express.Router();

const usercontroller = require("../Controller/user_controller");

router.get("/",usercontroller.users);
router.get("/sign-up",usercontroller.signup);
router.get("/sign-in",usercontroller.signin);
router.get("/profile",usercontroller.profile);
router.post("/create",usercontroller.createUser);
router.post("/create-session",passport.authenticate(
    "local",
    {failureRedirect : "/users/sign-up"},
),usercontroller.createSession);

//above is same as app.get("/url",function(req,res){
//     .....  heree function we get from controller
// })
module.exports = router;