const Commment = require("../models/commentSchema");
const Post = require("../models/PostSchema");

module.exports.createcomment  = function(req,res){
   Post.findById(req.body.post,function(err,post){
        if(err){
            console.log(err);
        }
        Commment.create({
            commentcontent: req.body.commentcontent,
            post : req.body.post,
            user: req.user._id,
        },function(err,comment){
            if(err){
                console.log("error in posting comments to db");
                return;
            }


            post.comments.push(comment);
            post.save();
            return res.redirect("/");  
        })
        
   })
}
