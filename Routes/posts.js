const express  = require("express");

const router = express.Router();
const postscontroller = require("../Controller/posts_controller");

router.get("/",postscontroller.posts);
module.exports = router;