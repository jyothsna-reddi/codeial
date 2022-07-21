const express  = require("express");
const passport = require("passport");

const router = express.Router();
const postscontroller = require("../Controller/posts_controller");


router.post("/create-post",passport.checkauthentication,postscontroller.createpost);
router.get("/destroy/:id",passport.checkauthentication,postscontroller.destroy);
module.exports = router;