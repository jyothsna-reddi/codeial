const express = require("express");

const routes = express.Router();

const usercontroller = require("../Controller/user_controller");

routes.get("/",usercontroller.users);

routes.get("/profile",usercontroller.profile);

module.exports = routes;