
let createlike = function(liketag){
    var v=($(liketag).children());
    console.log(v);
    $(v[0]).on("click",function(e){
        var imgchild = $(v[0]).children();
        e.preventDefault();
        
        $.ajax({
            method : "get",
            url : $(v[0]).prop("href"),
            success : function(data){
                let likes_count = $(v[1]).attr('data-likes');
               
                if(data.data.deleted){                   
                    $(imgchild[imgchild.length-1]).attr("src","https://cdn-icons.flaticon.com/png/128/2961/premium/2961957.png?token=exp=1659535936~hmac=e0544d2f43eb85968923d3254157f83f");
                    likes_count = parseInt(likes_count) - 1;
                }
                else{
                    
                    likes_count = parseInt(likes_count) + 1;
                    $(imgchild[imgchild.length-1]).attr("src","https://cdn-icons-png.flaticon.com/128/833/833472.png")
                }
                $(v[1]).attr("data-likes",likes_count);
                $(v[1]).html(likes_count," likes")
            },
            error : function(err){
                console.log("error",err)
            }
        })

    })
}


let apply_dynamic_like_to_existing_posts = function ()
{
    var like_post_array = $(".togglelike-post")
    for(let likes_array of like_post_array){
        
        createlike(likes_array);
    
    }
}
apply_dynamic_like_to_existing_posts();