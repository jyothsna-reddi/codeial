const passport = require("passport");
const googlestrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const env = require("../config/environment")
const User = require("../models/UserSchema");
const { profile } = require("console");

//tell passport to use google strategy
passport.use(new googlestrategy({
    clientID :env.google_clientID,
    clientSecret : env.google_clientSecret,
    callbackURL : env.google_callbackURL,
    },
    function(accessToken,refreshToken,profile,done){
        console.log(profile.emails[0].value)
        User.findOne({email : profile.emails[0].value},(function(err,user){
            if(err){
                console.log("cannot authe user via google strategy",err);
                return;
            }
            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password :crypto.randomBytes(20).toString("hex"),
                    //avtar : profile.photos[0],
                },(function(err,user){
                    if(err){
                        console.log("cannot create user via google strategy",err);
                        return;
                    }
                    else if(user){
                        return done(null,user);
                    }else{
                        return done(null,false);
                    }
                })
                )
            }
        }))

    }

))
/* ,
                })
            }) */