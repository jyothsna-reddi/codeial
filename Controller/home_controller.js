
//This is like app.get and app.post....

module.exports.home = function(req,res){
    return res.send("<h1>Hello you are at home controller</h1>");
}