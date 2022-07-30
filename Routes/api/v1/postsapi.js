const express=require("express");
const router = express.Router();
const postapi_controlller = require("../../../Controller/api/v1/post_api");

router.get("/",postapi_controlller.postlist);
router.get("/destroy/:id",postapi_controlller.destory);
module.exports = router;