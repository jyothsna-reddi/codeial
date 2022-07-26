var createnewpost = $("#create-post");
createnewpost.submit(function(e){
    e.preventDefault();
    console.log(createnewpost,"     ",createnewpost.serialize())
    $.ajax({
        url : "/posts/create-post",
        method : "POST",
        data : createnewpost.serialize(),
        success : function(data){
            console.log(data);
        },
        error : function(error){
            console.log(error.responseText);
        }
        
    })
})