const Like = require("../models/likeSchema");
const Post = require("../models/PostSchema");
const Comment = require("../models/commentSchema");

module.exports.togglelike = async function(req,res){
    try{
        let likable;
        var message;
        let deleted = false;
        ////console.log("reached",req.query.id,query_type)
        var query_type = req.query.type.charAt(0).toUpperCase() + req.query.type.substr(1).toLowerCase();
        if(query_type =='Post'){
            message = "post";
            likable = await Post.findById(req.query.id).populate("likes");
        }
        else{
            message = "comment";
            likable = await Comment.findById(req.query.id).populate("likes");
        }
        ////console.log("likeable",likable," ")
        let existinglike = await Like.findOne({
            user : req.user._id,
            onModel :query_type,
            likable : req.query.id,
        })
        //likable:req.query.id, onModel:query_type, user:req.user._id});
        console.log("existing",existinglike," ")
        if(existinglike != null){
            ////console.log("reached loop")
            //like is already existing. so remove like from post/comment and likes schema
            likable.likes.pull(existinglike._id);
            likable.save();
            existinglike.remove();
            deleted = true;
        }
        else {
            let new_like = await Like.create({
                user : req.user._id,
                onModel : query_type,
                likable : req.query.id,
            })
            likable.likes.push(new_like);
            likable.save();
            deleted = false;
            
        }
       
       console.log("deleted",deleted);
        if(req.xhr){
            if(deleted){
                return res.status(200).json ({
                    data : {
                        deleted : deleted,
                    },
                    message :  `Removed like for ${message} successfully`
                })
            }
            else{
                return res.status(200).json ({
                    data : {
                        deleted : deleted,
                    },
                    message : `Added like for ${message} successfully`
                })
            }
        }
        return res.redirect("back");
    }
    catch(err){
        ////console.log("error in publishing or removing like",err);
        return res.status(500).json ({
            message : "Cannot toggle like"
        })
        
    }
}