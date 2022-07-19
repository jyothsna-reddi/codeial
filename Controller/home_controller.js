// const home = require("/home.ejs")




//This is like app.get and app.post acllback function....
const Post = require("../models/PostSchema");
module.exports.home = function(req,res){
    Post.find({},function(err,post){
        if(err){
            console.log("cannot fetch posts");
            return;
        }
        else{
            console.log(post);
            return res.render("home", {
                titile : "home",
                posts : post,
            })
        }
    })
}