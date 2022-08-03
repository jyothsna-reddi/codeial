const Commment = require("../models/commentSchema");
const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");
const queue = require('../config/kue');
const comment_mailer = require("../mailer/comments_mailer/commets_mail")
const comment_email_worker = require("../workers/emails/comments_worker")

module.exports.createcomment  = async function(req,res){
    console.log("controller",req.body);
   try{
        let post = await Post.findById(req.body.post);
        let comment = await Commment.create({
                commentcontent: req.body.commentcontent,
                post : req.body.post,
                user: req.user._id,
        })
    post.comments.push(comment);
    post.save();
    let commentwithuser = await Commment.findById(comment._id).populate("user","name email");
   // comment_mailer.newcomment(commentwithuser);
//    let job = queueMicrotask.create("email",comment).save({
//         if(err){
//             console.log("error in creating queue")
//         }
//         //console.log(job.id)
//    })
   let job = queue.create('emails', commentwithuser).save(function(err){
    if (err){
        console.log('Error in sending to the queue', err);
        return;
    }
    console.log('job enqueued', job.id);

})

    if(req.xhr){
        return res.status(200).json({
            message : "Added comment successfully",
            data : commentwithuser,
        })
    }
    req.flash("success","Added comment successfully");
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
            req.flash("success","Delete comment successfully");
            return res.redirect("back");  
    }
    catch(err){
        console.log(err);
        return;
    }
    
}