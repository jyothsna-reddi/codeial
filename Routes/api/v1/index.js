const express=require("express");
const router = express.Router();

router.use("/post",require("./postsapi"));
module.exports = router;