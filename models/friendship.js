const mongoose = require("mongoose");
const friendsSchema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    friendid: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    } 
},{timestamps : true});
const Friendship = mongoose.model("Friendship",friendsSchema);
module.exports = Friendship;