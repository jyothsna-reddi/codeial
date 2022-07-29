//This is like app.get and app.post acllback function....

const Post = require("../models/PostSchema");
const Comment = require("../models/commentSchema")
const User = require("../models/UserSchema")
module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})
        .sort("-createdAt")
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    })
    let user =  await User.find({});
    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        allusers : user,
    });
    }
    catch(err){
        console.log(err);
        return;
    }
}
