const express  = require("express");

const router = express.Router();
const commentscontroller = require("../Controller/comment_controller");


router.post("/create-comment",commentscontroller.createcomment);
module.exports = router;