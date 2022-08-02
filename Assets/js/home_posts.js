let notyflash = function(status,msg) {
    new Noty({
        theme : "relax",
        text: msg,
        type: status,
        layout : "topRight",
        timeout:1500
    }).show();
}
function createpost(){
    var createnewpost = $("#create-post");
    createnewpost.submit(function (e) {
        e.preventDefault();
      //  console.log(createnewpost, "     ", createnewpost.serialize());
        $.ajax({
            url: "/posts/create-post",
            method: "POST",
            data: createnewpost.serialize(),//serializing means to convert the form data into JSON { key-value pair } 
            success: function (data) {
                console.log(data.data);
                let newPost = newpost(data.data.post);
                
                console.log(newPost);
                $(".display-post").prepend(newPost);
                //notify
                $(".posts_text").val("");
                notyflash("success",data.message)
                //to delete post
                deletepost($(".delete-post"),newPost);
                createcommment($(`#post-${data.data.post_id} .new-comment-form`));
            },
            error: function (error) {
                notyflash("error","Can not add the post")
                console.log(error.responseText);
            },
        });
    });
}


function newpost(post) {
    
    return $(`
    <div class="posts" id="post-${post._id}">
        <div>
            <div class="post-content">
                ${post.user.name}
                ${post.postContent}
                <div class="delete-posts">
                    <a class="delete-post" href="/posts/destroy/${post._id}">Delete Post</a>
                </div>
            </div>
            <div class="post-details">
                ${post.createdAt}
            </div>
            <hr>
        </div>
        <div class="add-comment">
            <form action="/comments/create-comment" class="comment-form" method="POST">
                <input type="text" name="commentcontent" placeholder="Add your thoughts...">
                <input type="hidden" name="post" value=${post._id} >
                <button type="submit">Add Comment</button>
            </form>

        </div>
        <div class="display-comments">
        </div>
    </div>
        

   
    `);
}
let deletepost = function(deleteLink){

   
    $(deleteLink).on("click", function (e) {

        e.preventDefault();
        $.ajax({
            method: "get",
            url:  $(deleteLink).prop("href"),
            success: function (data) {
                $(`#post-${data.data.post._id}`).remove();
                notyflash("success",data.message)
            },
            error: function (error) {
                notyflash("error","Cannot delete the post")
                console.log(error.responseText);
            },
        });
    });
}


let apply_dynamic_delete_to_existing_posts = function ()

{
    var delete_post_array = $(".delete-post")
    for(let deleteposts of delete_post_array){
        console.log("reachedd");
        deletepost(deleteposts);
    
    }
}

apply_dynamic_delete_to_existing_posts()
createpost();
//*************** Comments ajax*********************//
function createcommment(comment_add) {
    console.log("comments///",comment_add)
    $(comment_add).on("submit",function(e){
       
         e.preventDefault();
     
        $.ajax({
            method : "post",
            data : $(comment_add).serialize(),
            url : "/comments/create-comment",
            success : function(data){
                console.log(data.data);
                var new_comment = newcomment(data.data);
                $(".display-comments").prepend(new_comment);
                //notify
                notyflash("success",data.message)
                
            },
            error : function(err){
                console.log(err.responseText);
            }
        })
    })
}
function newcomment(comment) {
    console.log("loop",comment.commentcontent,"  ",comment.user.name,"  ",comment._id)
    return $(`
    <div class="comments" id="comment-${comment._id}">
    <div>
        ${ comment.commentcontent}
    </div>
    <div>
        ${ comment.user.name}
    </div>
    <div class="delte-comment">
        <a href="/comments/destroy/${comment._id}">Delete Comment</a>
    </div>
</div>`)
}
// let apply_to_all_posts = function() {
//     $("ass")
// }
let apply_dynamic_addcomment_to_existing_posts = function ()
{
    var addcomment_post_array = $(".new-comment-form")
    for(let comments_array of addcomment_post_array){
        console.log("reachedd-comment");
        createcommment(comments_array);
    
    }
}
apply_dynamic_addcomment_to_existing_posts();
