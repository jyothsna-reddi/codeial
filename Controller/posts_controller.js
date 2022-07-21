
const Post = require("../models/PostSchema");
const Comment = require("../models/commentSchema")
const mongoose = require("mongoose");


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
module.exports.destroy = function(req,res){
   // ObjectId.fromString( req.params.id );
   // console.log("is valid", req.params.id ,mongoose.Types.ObjectId.isValid(req.params.id));
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log((err),"wee")
        }
        if(post.user== req.user.id ){
           
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    return;
                }
                return res.redirect("/");
            })
        }
        else{
            console.log(":sjshsg");
            return res.redirect("/");  
        }
    })
    // Post.deleteOne(req.params,function(err,post){

    //     return res.redirect("/");
    // })
}