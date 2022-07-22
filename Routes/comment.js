const express  = require("express");
const passport = require("passport")

const router = express.Router();
const commentscontroller = require("../Controller/comment_controller");


router.post("/create-comment",commentscontroller.createcomment);
router.get("/destroy/:id",passport.checkauthentication,commentscontroller.destroy);
module.exports = router;