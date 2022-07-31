const express=require("express");
const passport = require("passport");
const router = express.Router();
const postapi_controlller = require("../../../Controller/api/v1/post_api");

router.get("/",postapi_controlller.postlist);
router.post("/createpost",postapi_controlller.createpost);
router.get("/destroy/:id",passport.authenticate("jwt",{session:false}),postapi_controlller.destory);
module.exports = router;