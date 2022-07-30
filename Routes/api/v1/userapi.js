const express=require("express");
const router = express.Router();
const userapi_controlller = require("../../../Controller/api/v1/user_api");

router.post("/create-session",userapi_controlller.createsession);
// router.post("/createpost",postapi_controlller.createpost);
// router.get("/destroy/:id",postapi_controlller.destory);
module.exports = router;