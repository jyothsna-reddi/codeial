const mongoose = require("mongoose");
 const Postschema = new mongoose.Schema ({
   
    postContent:{
        type : String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
    },
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
 },{timestamps : true});
 const Post = mongoose.model("Post",Postschema);
 module.exports = Post;