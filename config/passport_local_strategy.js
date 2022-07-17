
const passport = require("passport");4

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/UserSchema")

// authentication using passport
passport.use(new LocalStrategy({
    usernameField : "email",
   },
    function (email,password,done) {
        User.findOne({email : email},  function(err,user){
            if(err){
                console.log("error",'Error in finding user --> Passport');
                return done(err);
             }
             else if(!user || user.password != password){
                console.log("error",'Invalid Username/Password');
                return done(null,false);
             }
             else{
                return done(null,true);
             }
        })
    }
))
console.log("called");
//serialize user 
passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in passport local");
            return done(err);
         }
        if(user){
            return done(null,user);
        }
        return done(null,false);
    })
})
module.exports = passport;