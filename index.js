const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const MongoStore = require("connect-mongo");
//SASS and SCSS
const scssMiddleware = require("node-sass-middleware");
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal = require("./config/passport_local_strategy");
const passportjwt = require("./config/passport_jwt_strategy");
const passportgoogle = require("./config/passport_google_ouath_strategy")
//added flash for notifications
const flash = require("connect-flash");
//call custom middleare - flash
const custommiddleware = require("./config/middleware");

//SCSS Setup
app.use(scssMiddleware ({
    src : "./Assets/scss",
    dest : "./Assets/css",
    debug : false,
    prefix :"/css",
    outputStyle : "expanded",
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use("/uploads",express.static(__dirname+"/uploads"))

app.use(expressLayouts);//this  is for layouts...place before route

// extract style and scripts from sub pages into the layout 
//use layouts before routes
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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
    },
    store: MongoStore.create({
        //options)
    // store : new MongoStore({
       mongoUrl : "mongodb://0.0.0.0:27017/social_media",
        autoremove : "disabled",
    },function(err){
        console.log("error at mongo store",err || "connection established to store cookie");
    })
}));
//passport initialize 
app.use(passport.initialize());
//passport to link session
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

//use flash after session
app.use(flash());
//call middleware to set flash
app.use(custommiddleware.setflash);
//add it in layouts
//use express router 
app.use('/',require("./Routes/index"));
app.use('/api',require("./Routes/api/index"));
app.listen(port,function(err){
    if(err){
        console.log("cannot connect to server");
    }
    else{
        console.log(`Connect to server on port:${port}`);
    }
})






