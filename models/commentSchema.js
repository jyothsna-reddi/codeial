const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    commentcontent : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    posts : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
},{timestamps: true});

const Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment;