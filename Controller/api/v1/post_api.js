module.exports.postlist = function(req,res){
    return res.json(200, {
        message : "List of posts",
        data : [],
    })
}