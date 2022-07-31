const User = require("../../../models/UserSchema");
const jwt = require("jsonwebtoken");

module.exports.createsession = async function(req,res){
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(404).json({
                meassage : "Invalid username or password"
            })
        }
        if(user){
            return res.status(200).json({
                meassage : "Successfully logged in. Please find your token",
                data : {
                    token : jwt.sign(user.toJSON(),"codeial",{expiresIn :"1000000"})
                }
            })
        }
    }
    catch(err){

    }
}