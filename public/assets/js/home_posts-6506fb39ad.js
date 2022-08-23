let notyflash=function(t,e){new Noty({theme:"relax",text:e,type:t,layout:"topRight",timeout:1500}).show()};function createpost(){var e=$("#create-post");e.submit(function(t){t.preventDefault(),$.ajax({url:"/posts/create-post",method:"POST",data:e.serialize(),success:function(t){console.log(t.data);var e=newpost(t.data.post);console.log(e),$(".display-post").prepend(e),$(".posts_text").val(""),notyflash("success",t.message),deletepost($(".delete-post"),e),createcommment($(`#post-${t.data.post_id} .new-comment-form`))},error:function(t){notyflash("error","Can not add the post"),console.log(t.responseText)}})})}function newpost(t){return $(`
    <div class="posts" id="post-${t._id}">
        <div>
            <div class="post-content">
                ${t.user.name}
                ${t.postContent}
                <div class="delete-posts">
                    <a class="delete-post" href="/posts/destroy/${t._id}">Delete Post</a>
                </div>
            </div>
            <div class="post-details">
                ${t.createdAt}
            </div>
            <hr>
        </div>
        <div class="add-comment">
            <form action="/comments/create-comment" class="comment-form" method="POST">
                <input type="text" name="commentcontent" placeholder="Add your thoughts...">
                <input type="hidden" name="post" value=${t._id} >
                <button type="submit">Add Comment</button>
            </form>

        </div>
        <div class="display-comments">
        </div>
    </div>
        

   
    `)}let deletepost=function(e){$(e).on("click",function(t){t.preventDefault(),$.ajax({method:"get",url:$(e).prop("href"),success:function(t){$("#post-"+t.data.post._id).remove(),notyflash("success",t.message)},error:function(t){notyflash("error","Cannot delete the post"),console.log(t.responseText)}})})},apply_dynamic_delete_to_existing_posts=function(){var t;for(t of $(".delete-post"))console.log("reachedd"),deletepost(t)};apply_dynamic_delete_to_existing_posts(),createpost();