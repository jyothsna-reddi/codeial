//To fetch data from database (post data)
const Post = require("../../../models/PostSchema");
const Comment = require("../../../models/commentSchema");

module.exports.postlist = async function(req,res){
    try {
        let posts = await Post.find({})
        .sort("-createdAt")
        .populate("user", "name email avtar")
        .populate ({
            path : "comments",
            populate: {
                path: 'user'
            }
        })
        return res.json(200, {
            message : "List of posts",
            data : {
                posts : posts,
            }
        })
    }
    catch(err){

    }
   
    // return res.json(200, {
    //     message : "List of posts",
    //     data : [],
    // })
}
//delete posts
module.exports.destory = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post : req.params.id});
            return res.json(200,{
                message:"deleted post successfully"
            })
        }
        
        else{
            console.log(post,req.user.id);
            return res.json(404,{
                message:"unauthorized"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.json(404,{
            message:"Not authorized to delete post"
        })
    }
}
module.exports.createpost = async function(req,res){
    try{
        let post = await Post.create(
            // postContent : req.body.postContent,
            // user : req.body.userid,
            req.body
        )
        
      
        return res.json(200,{
            message : "Added post successfully"
        })
    }

    catch(err){
        console.log(err,"   hello   ",req.body)
        return res.json("500",{
            message : "inetrnal server error"
        })
    }
}
