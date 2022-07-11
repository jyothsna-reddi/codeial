// const home = require("/home.ejs")




//This is like app.get and app.post acllback function....
module.exports.home = function(req,res){
    return res.render('home');
}