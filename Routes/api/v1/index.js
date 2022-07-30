const express=require("express");
const router = express.Router();
const homeapi_controller = require("../../../Controller/api/v1/homeapi")
router.get("/",homeapi_controller.home);
router.use("/post",require("./postsapi"));
router.use("/user",require("./userapi"))
module.exports = router;