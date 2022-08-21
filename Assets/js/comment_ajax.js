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
                var new_comment = newcomment(data.data.comment);
                $(`#post-comments-${data.data.post_id}`).prepend(new_comment);
                // console.log("com",$(this))
                // $(this).find(".comment-text").value=" ";
                //added delete functio to new comments
                deletecomment($(".delete-comment-tag"),new_comment);
                notyflash("success",data.message)
                
            },
            error : function(err){
                console.log(err.responseText);
            }
        })
    })
}
function deletecomment(deletecomment) {
    $(deletecomment).on("click",function(e){
        e.preventDefault();
        $.ajax({
            method : "get",
            url : $(deletecomment).prop("href"),
            success :function(data){
                $(`#comment-${data.data.comment._id}`).remove();
                notyflash("success",data.message)
            },
            error: function (error) {
                notyflash("error","Cannot delete the comment")
                console.log(error.responseText);
            },
        })
    })

}

function newcomment(comment) {
    
    return $(`
    <div class="comments" id="comment-${comment._id}">
    <div>
        ${ comment.commentcontent}
    </div>
    <div>
        ${ comment.user.name}
    </div>
    <div class="delte-comment">
        <a class="delete-comment-tag" href="/comments/destroy/${comment._id}">Delete Comment</a>
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
   //     console.log("reachedd-comment");
        createcommment(comments_array);
    
    }
}
let apply_dynamic_deletecomment_to_existing_comments = function ()
{
    var deletecomment_array = $(".delete-comment-tag")
    for(let deletecomments_indi of deletecomment_array){
        deletecomment(deletecomments_indi);
    
    }
}
apply_dynamic_addcomment_to_existing_posts();
apply_dynamic_deletecomment_to_existing_comments();
