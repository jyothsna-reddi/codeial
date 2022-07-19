const Commment = require("../models/commentSchema");

module.exports.createcomment  = function(req,res){
    Commment.create({
        commentcontent: req.body.commentcontent,
        user: req.user._id,
    },function(err,comment){
        if(err){
            console.log("error in posting comments to db");
            return;
        }
        return res.redirect("/");  
    })
}
