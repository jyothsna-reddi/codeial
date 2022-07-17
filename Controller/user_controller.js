const User = require()
module.exports.users = function(req,res){
    return res.render("users");
}
module.exports.profile  = function(req,res){
    return res.send("<h1>Profile page is up and running</h1>");
}
module.exports.signup = function(req,res){
    return res.render("Signup");
}
module.exports.signin = function(req,res){
    return res.render("Login");
}
module.exports.createUser = function(req,res){
//    Todo later
   
   
    return res.redirect("/");
}
module.exports.createSession = function(req,res){
        return res.redirect("/");
    }

