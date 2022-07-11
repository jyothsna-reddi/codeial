const express= require("express");

const router = express.Router();
const homecontroller = require("../Controller/home_controller");

console.log("Router loaded");
//Access controller
router.get("/",homecontroller.home)
router.use('/users',require("./users"));
//available to index.js
module.exports = router;