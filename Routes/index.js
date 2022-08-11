const express= require("express");

const router = express.Router();
const homecontroller = require("../Controller/home_controller");

console.log("Router loaded");
//Access controller
router.get("/",homecontroller.home)
router.use('/users',require("./users"));
router.use("/likes",require("./likes"))
router.use("/posts",require("./posts"));
router.use('/comments',require("./comment"));
//available to index.js
module.exports = router;
