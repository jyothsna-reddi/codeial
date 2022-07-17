const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal = require("./config/passport_local_strategy");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);//this  is for layouts...place before route

// extract style and scripts from sub pages into the layout 
//use layouts before routes
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//view engine setup
app.use('/',require("./Routes/index"));

// set up the view engine
app.set("view engine","ejs");
app.set("views","./views");
//app.set("views",path.join(__dirname,"views"));

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
//passport initialize 
app.use(passport.initialize());
//passport to link session
app.use(passport.session());


//use express router 


app.listen(port,function(err){
    if(err){
        console.log("cannot connect to server");
    }
    else{
        console.log(`Connect to server on port:${port}`);
    }
})