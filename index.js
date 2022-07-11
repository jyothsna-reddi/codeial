const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose")
const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//use express router 
app.use('/',require("./Rouutes/index"));




app.listen(port,function(err){
    if(err){
        console.log("cannot connect to server");
    }
    else{
        console.log(`Connect to server on port:${port}`);
    }
})