const Commment = require("../models/commentSchema");
const Post = require("../models/PostSchema");

module.exports.createcomment  = async function(req,res){
   try{
        let post = await Post.findById(req.body.post);
        let comment = await Commment.create({
                commentcontent: req.body.commentcontent,
                post : req.body.post,
                user: req.user._id,
        })
    post.comments.push(comment);
    post.save();
    return res.redirect("/");  
   }
   catch(err){
        console.log(err);
        return;
   }
}
module.exports.destroy = async function(req,res){
    // Commment.findById(req.params.id,function(err,comment){
    //     Post.findById(comment.post,function(err,post){
    //         if(comment.user == req.user.id || post.user == req.user.id){
    //             var comment_post_id =comment.post;
    //             console.log("hhghg",comment_post_id); 
    //             comment.remove();
    //             Post.findByIdAndUpdate(comment_post_id, {$pull : {comments : req.params.id}},function(err,post){
    //                if(err){
    //                 console.log("cannot delete id from post");
    //                 return;
    //                }
    //             })
    
    //         }
    //         else{
    //             return;
    //         }
    //     })
       
    // })
    // return res.redirect("back");  

    //above code is without async and await
    try{
        let comment = await Commment.findById(req.params.id);
        let post = await Post.findById(comment.post);
            if(comment.user == req.user.id || post.user == req.user.id){
                var comment_post_id =comment.post;
                comment.remove();
                let posts_update = await Post.findByIdAndUpdate(comment_post_id, {$pull : {comments : req.params.id}});
            }
            else{
                return res.redirect("back");  ;
            }
            return res.redirect("back");  
    }
    catch(err){
        console.log(err);
        return;
    }
    
}