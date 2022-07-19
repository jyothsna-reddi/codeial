const express  = require("express");

const router = express.Router();
const postscontroller = require("../Controller/posts_controller");


router.post("/create-post",postscontroller.createpost);
module.exports = router;