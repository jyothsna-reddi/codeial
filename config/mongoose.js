const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/social_media");

const db = mongoose.connection;

db.on("error",console.error.bind(console,"error cannecting to db"));

db.once("open",function(err){
    if(err){
        console.log("Cannot connect to db");
        return;
    }
    else{
        console.log("successfully connected to db");
        return;
    }
})
module.exports = db;