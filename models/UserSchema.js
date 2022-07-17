const mongoose = require("mongoose");

const user = mongoose.Schema({
    email :{
        type : String,
        require : true,
        unique : true,

    },
    phone :{
        type : String,
        require : true,
        
    },
    name :{
        type : String,
        require : true,
        
    },
},{timestamps : true})

const User = mongoose.model("user",user);
module.exports = User;