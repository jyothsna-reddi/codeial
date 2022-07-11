const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const expresslayout = require("express-ejs-layouts");

const app = express();

//view engine setup
app.set("view engine","ejs");
//app.set("views",path.join(__dirname,"views"));
app.set("views","./views");
//use layouts before routes
//app.use(expresslayout);

//use express router 
app.use('/',require("./Routes/index"));




app.listen(port,function(err){
    if(err){
        console.log("cannot connect to server");
    }
    else{
        console.log(`Connect to server on port:${port}`);
    }
})