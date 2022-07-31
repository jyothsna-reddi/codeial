const passport = require("passport");
const googlestrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/UserSchema");
const { profile } = require("console");

//tell passport to use google strategy
passport.use(new googlestrategy({
    clientID :"127992776020-cu4dfl4omtcrnefgh8oska1vrktj9bsu.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        console.log(profile.emails[0].value)
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
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
                    email : profile.emails[0],
                    password :crypto.randomBytes(20).toString("hex"),
                    avtar : profile.photos[0],
                }).exec(function(err,user){
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
            }
        })

    }

))