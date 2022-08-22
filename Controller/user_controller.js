const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");
const Friend = require("../models/friendship")
const Reset = require("../models/reset_passwordSchema");
const reset_mailer = require("../mailer/reset/reset_email.js");
const crypto = require("crypto");
const fs=require("fs");
const path = require("path");
const { Cipher } = require("crypto");
const { reset } = require("nodemon");
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
//updtae user  profile and converting to async and await
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id) {
        //find user first 
        let user = await User.findById(req.params.id);
        User.uploadavtar(req,res,function(err){
            if(err){
                console.log("error in uploading file",err);
            }
            user.name = req.body.name;
            user.email = req.body.email;
            console.log(req.file);
            
            if(req.file){
                
                if(req.file.mimetype == ("image/jpeg")){
                   if(user.avtar && fs.existsSync(path.join(__dirname,"..",user.avtar))){
                      fs.unlinkSync(path.join(__dirname,"..",user.avtar));
                    }
                    user.avtar = User.avtar_path+"/"+req.file.filename;
                    req.flash("success","Updated profile pics successfully");
                    user.save();
                    
               }
                 else{
                    console.log("cannot upload image");
                    req.flash("error","Cannot upload the file..plz select only image files");
                 }
                return res.redirect("back");
            }
            
            
            return res.redirect("back");
        })
    }
    // if(req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id,{
    //         name : req.body.name,
    //         email : req.body.email,
    //     },function(err,user){
    //         return res.redirect("back");
    //     })
    // }
}
module.exports.signup = function(req,res){
    return res.render("Signup",{title : "Sign-up"});
}
module.exports.signin = function(req,res){
    return res.render("Login",{title : "Sign-in"});
}
module.exports.createUser = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log("password mismatch");
        req.flash("error","Password is not matching");
        return res.redirect("back");
    }
    let user = await User.findOne({email:req.body.email});
        if(user){
            console.log("Cannot create the user");
            req.flash("error","Already user exists");
            return res.redirect("back");
        }
        else if(!user){
            let user_create = User.create(req.body);
            req.flash("success","successfully signed up !!");
            return res.redirect('/users/sign-in');
        } 
}
module.exports.createSession = function(req,res){
    req.flash("success","Logged in successfully");
        return res.redirect("/");
}
module.exports.destroysession = function(req,res){
    req.logout(function(err){
        if(err){
            return;
        }
        req.flash("success","Logged out successfully");
        //as we have defined flash in req need to add it in res (middleware - config)
        return res.redirect('/');
    });
    
}
module.exports.forgotpassword = function(req,res){
    return res.render("forgotpassword",{
        title : "Forgot Password",
    })
}
module.exports.resetpassword = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
       
    if(user){
        let reset = await Reset.create({
            user : user,
            accesstoken : crypto.randomBytes(20).toString("hex"),
            isvalid : true,
        })
        let resetwithuser = await Reset.findById(reset._id).populate("user");
        console.log("user",resetwithuser.user);
        req.flash("Success","Email sent successfully");
        reset_mailer.reset(resetwithuser);
        
        console.log("email sent successfully to reset the password");
        return res.redirect("back");;
    }
    return res.redirect("back");
    }
    catch(err){
        console.log("error",err);
        return;
    }
}
module.exports.resetmail = async function(req,res){
    let reset_password =await Reset.findOne({accesstoken : req.params.token})
    

    return res.render("reset",{
        title : "Reset Password",
        reset : reset_password,
    });
}
module.exports.passwordcheck = async function(req,res){
    let reset_password =await Reset.findOne({accesstoken : req.body.token})
    
    if(req.body.password != req.body.confirm_password){
        console.log("password mismatch");
        req.flash("error","Password is not matching");
        return res.redirect("back");
    }
    let user = await User.findById(reset_password.user);
    reset_password.isvalid = false;
    user.password = req.body.password;
    user.save();
    reset_password.save();
    //console.log(reset_password.isvalid,user.password);
    req.flash("success","Password has reset");
    return res.redirect('/users/sign-in');
}
module.exports.makefriendship = async function(req,res){
    if(req.user){
        let addedfriend = false;
    let friend_exists = await Friend.findOne({
        userid:req.user._id,
        friendid : req.query.id,
    })
    let user = await User.findById(req.user._id);
    let userfriend = await User.findById(req.query.id);
    
    if(friend_exists !=null){
      user.friendship.pull(req.query.id);
      userfriend.friendship.pull(req.user._id)
      friend_exists.remove();
      addedfriend = false;
    }
    else{
        let friend = await Friend.create({
            userid:req.user._id,
            friendid :req.query.id
        })
        user.friendship.push(req.query.id);
       // console.log("198",userfriend.friendship.push(req.user._id));
        addedfriend = true;
    }
   // console.log("184",userfriend)
    user.save();
    userfriend.save();
    if(req.xhr){
        if(addedfriend){
            return res.status(200).json({
                data : {
                    added : addedfriend,
                    message : "Added friend successfully"
                },
            })
        }
        else{
            return res.status(200).json({
                data : {
                    added : addedfriend,
                    message : "Removed friend successfully"
                },
            })
           
        }
    }

    }
    return res.redirect('/');
}