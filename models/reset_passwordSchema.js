const mongoose = require("mongoose");
 const resetSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
    },
    accesstoken : {
        type : String,
    },
    isvalid : {
        type : Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 36,// this is the expiry time in seconds
      },
    
},)

 const Reset = mongoose.model("Reset",resetSchema)
 module.exports = Reset;