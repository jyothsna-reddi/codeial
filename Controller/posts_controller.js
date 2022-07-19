
const Post = require("../models/PostSchema");

module.exports.createpost = function(req,res){
    Post.create({
        postContent :req.body.postContent,
        user: req.user._id,
    },
        function(err,post){
        if(err){
            console.log("error in posting posts to db");
            return;
        }
        return res.redirect("/");
    })
}