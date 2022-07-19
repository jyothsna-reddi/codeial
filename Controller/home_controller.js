// const home = require("/home.ejs")




//This is like app.get and app.post acllback function....
const Post = require("../models/PostSchema");
module.exports.home = function(req,res){
    Post.find({}).populate("user").exec(function(err,post){
        if(err){
            console.log("cannot fetch posts",err);
            return;
        }
        else{
            console.log(post);
            return res.render("home", {
                title : "home",
                posts : post,
            })
        }
    });
}