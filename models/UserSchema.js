const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Avtar_Path = path.join("/uploads/users/avtars")

const user = mongoose.Schema({
    email :{
        type : String,
        require : true,
        unique : true,

    },
    password :{
        type : String,
        require : true,
        
    },
    name :{
        type : String,
        require : true,   
    },
    avtar : {
        type : String,
    },
    friendship: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},{timestamps : true})

//to define storgare
var storage  = multer.diskStorage ({
    destination : function(req,file,callback){
        callback(null,path.join(__dirname,"..",Avtar_Path));
    },
    filename : function(req,file,callback){
        var temp_file_arr=file.originalname.split(".");
        var temp_file_name = temp_file_arr[0];
        var temp_file_extension = temp_file_arr[1];
        callback(null,Date.now()+"-"+temp_file_name+"."+temp_file_extension);
    },
})
//to available across the appli
user.statics.uploadavtar = multer({storage : storage}).single("avtar");
user.statics.avtar_path = Avtar_Path;
const User = mongoose.model("User",user);
module.exports = User;