const express= require("express");
const router = express.Router();
const likes_controller = require("../Controller/likes_controller")
router.get("/toggle",likes_controller.togglelike)

module.exports = router;
