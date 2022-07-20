//This is like app.get and app.post acllback function....

const Post = require("../models/PostSchema");
const Comment = require("../models/commentSchema")
const User = require("../models/UserSchema")
module.exports.home = function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
}
