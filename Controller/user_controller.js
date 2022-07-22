const Post = require("../models/PostSchema");
const User = require("../models/UserSchema")
module.exports.users = function(req,res){
    return res.render("users");
}
module.exports.profile  = async function(req,res){
    //async and await
    try {
        let user = await User.findById(req.params.id);
        let post = await Post.find({user : req.params.id});
        return res.render("profile", {
            title : "Profile",
            profile_user : user,
            posts : post,
        })    
    }catch(err){
        console.log(err);
        return res.redirect("/");
    }
    // User.findById(req.params.id,function(err,user){
    // Post.find({user : req.params.id},function(err,post){
    //     return res.render("profile", {
    //         title : "Profile",
    //         profile_user : user,
    //         posts : post,
    //     })
    // })
    // })  
}
module.exports.update = function(req,res){
    if(req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id,{
            name : req.body.name,
            email : req.body.email,
        },function(err,user){
            return res.redirect("back");
        })
    }
}
module.exports.signup = function(req,res){
    return res.render("Signup",{title : "Sign-up"});
}
module.exports.signin = function(req,res){
    return res.render("Login",{title : "Sign-in"});
}
module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log("password mismatch");
        return res.redirect("back");
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Cannot create the user");
            return;
        
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                };
                return res.redirect('/users/sign-in');
            });
        } 
        else{
            return res.redirect("back");
        }
    })
   
   
   
    return res.redirect("/");
}
module.exports.createSession = function(req,res){
        return res.redirect("/");
}
module.exports.destroysession = function(req,res){
    req.logout(function(err){
        if(err){
            return;
        }
        return res.redirect('/');
    });
    
}

