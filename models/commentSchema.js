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
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Posts",
    }
},{timestamps: true});

const Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment;