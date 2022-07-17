
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
                return done(null,user);
             }
        })
    }
))
// passport.checkauthentication=function(req,res,next){
//     if(req.isAuthenticated()){
//         console.log("reqqq",req.isAuthenticated);
//         return next();
//     }
//     return res.redirect('/user/signin');
// }
// passport.setauthenticatedUser=function(req,res,next){
//     if(req.isAuthenticated()){
//         res.locals.user=req.user;
//     }
//     next();
// }
passport.checkauthentication =(function(req,res,next){
    if(req.isAuthenticated()){
      //  console.log("bhgh",req);
        return next();
    }
    return res.redirect('/users/sign-in');
})
passport.setAuthenticatedUser = (function(req,res,next){
    
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
})
//serialize user 
passport.serializeUser(function(user,done){
    console.log(user,user.id);
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