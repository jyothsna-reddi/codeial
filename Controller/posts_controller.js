const User =require("../models/UserSchema");
const Post = require("../models/PostSchema");
const Comment = require("../models/commentSchema")
const mongoose = require("mongoose");


module.exports.createpost = async function (req, res) {
    let post = await Post.create({
        postContent: req.body.postContent,
        user: req.user._id,
    });
    // let posts = await Post.find({})
    // .sort("-createdAt")
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
// })
  let posts = await Post.findById(post._id).populate("user","name email");
 // console.log("ghg",users);
    if(req.xhr){
        return res.status(200).json({
            data :{
                post : posts,
          //      user : user,
            },
            message : "Posted successfully"
        })
    }
        // function (err, post) {
        //     if (err) {
        //         console.log("error in posting posts to db");
        //         return;
        //     }
        //     req.flash("success","Added post successfully");
        //     return res.redirect("/");
        // })
}
module.exports.destroy =  async function (req, res) {
     //async and await
   try{
    
    let post = await Post.findById(req.params.id);
   
    if (post && post.user == req.user.id) {
        post.remove();
        console.log(post,"sss");
        await Comment.deleteMany({ post: req.params.id }) 
        if(req.xhr){
            return res.status(200).json({
                data :{
                    post : post 
                },
                message : "Deleted post successfully"
            })
        }
        req.flash("success","Deleted post successfully");
        return res.redirect("/");
    }
   }catch(err){
    console.log(err);
    return res.redirect("/");
   }




    // ObjectId.fromString( req.params.id );
    // console.log("is valid", req.params.id ,mongoose.Types.ObjectId.isValid(req.params.id));
    // Post.findById(req.params.id, function(err, post){
    //     if(err){
    //         console.log((err),"wee")
    //     }
    //     if(post.user== req.user.id ){

    //         post.remove();
    //         Comment.deleteMany({post:req.params.id},function(err){
    //             if(err){
    //                 return;
    //             }
    //             return res.redirect("/");
    //         })
    //     }
    //     else{
    //         console.log(":sjshsg");
    //         return res.redirect("/");  
    //     }
    // })

   


    // Post.deleteOne(req.params,function(err,post){

    //     return res.redirect("/");
    // })
}