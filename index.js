const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.static('./assets'));
app.use(cookieParser);
app.use(expressLayouts);//this  is for layouts...place before route
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router 
app.use('/',require("./Routes/index"));

//view engine setup
app.set("view engine","ejs");
//app.set("views",path.join(__dirname,"views"));
app.set("views","./views");
//use layouts before routes



app.listen(port,function(err){
    if(err){
        console.log("cannot connect to server");
    }
    else{
        console.log(`Connect to server on port:${port}`);
    }
})