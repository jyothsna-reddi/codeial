function craetefriendship(friend) {
    console.log("reached-friend");
    $(friend).on("click",function(e){
        console.log("reached-friensssd");
        e.preventDefault();
        $.ajax({
                method : "Get",
                url : $(friend).prop("href"),
                success : function(data){
                    
                    if(data.data.added){
                        $(friend).html("Unfollow");
                    }
                    else{
                       // console.log(data.data, $(friend).html());
                        $(friend).html("Follow");
                    }
                },
                error : function(error){
                }
            })
        
        
   
        
    })
}
let apply_dynamic_to_existing_friends = function ()
{
    var addfriend = $(".frnd-a-tag")
    for(let friend of addfriend){
        craetefriendship(friend);
    
    }
}
apply_dynamic_to_existing_friends();
