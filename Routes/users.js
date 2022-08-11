const { request } = require("express");
const express = require("express");
const passport = require("passport");
const router = express.Router();

const usercontroller = require("../Controller/user_controller");
const { route } = require("./posts");

router.get("/",usercontroller.users);
router.get("/sign-up",usercontroller.signup);
router.get("/sign-in",usercontroller.signin);
router.get("/profile/:id",passport.checkauthentication,usercontroller.profile);
router.post("/create",usercontroller.createUser);
router.get("/sign-out",usercontroller.destroysession);
router.post("/update/:id",usercontroller.update);
router.get("/forgot-password",usercontroller.forgotpassword);
router.post("/reset-password",usercontroller.resetpassword);
router.get("/resetpassword/:token",usercontroller.resetmail)
router.post("/passwordcheck",usercontroller.passwordcheck);
router.post("/create-session",passport.authenticate(
    "local",
    {failureRedirect : "/users/sign-up"},
),usercontroller.createSession);
//google routes
router.get("/auth/google",passport.authenticate("google",{scope : ['profile','email']}))
router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect : "/users/sign-in" }),usercontroller.createSession)

//above is same as app.get("/url",function(req,res){
//     .....  heree function we get from controller
// })

module.exports = router;