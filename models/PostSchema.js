const mongoose = require("mongoose");
 const Postschema = new mongoose.Schema ({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
    },
    postContent:{
        type : String,
        required : true
    },
 },{timestamps : true});
 const Posts = mongoose.model("Posts",Postschema);
 module.exports = Posts;