const passport = require("passport");
//jwt strategy
var JwtStrategy = require('passport-jwt').Strategy;
//extract jwt
const ExtractJwt = require('passport-jwt').ExtractJwt;
//to validate if user exists or not
const User = require("../models/UserSchema");
var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial',
}
passport.use(new JwtStrategy(opts,function(jwtpayload,done){
    User.findById((jwtpayload._id),function(err,user){
        if(err){
            console.log("error",err);
            return done(err);
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,"false");
        }
    })
})
)