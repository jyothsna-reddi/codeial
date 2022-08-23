function createcommment(t){console.log("comments///",t),$(t).on("submit",function(e){e.preventDefault(),$.ajax({method:"post",data:$(t).serialize(),url:"/comments/create-comment",success:function(e){console.log(e.data);var t=newcomment(e.data.comment);$("#post-comments-"+e.data.post_id).prepend(t),deletecomment($(".delete-comment-tag"),t),notyflash("success",e.message)},error:function(e){console.log(e.responseText)}})})}function deletecomment(t){$(t).on("click",function(e){e.preventDefault(),$.ajax({method:"get",url:$(t).prop("href"),success:function(e){$("#comment-"+e.data.comment._id).remove(),notyflash("success",e.message)},error:function(e){notyflash("error","Cannot delete the comment"),console.log(e.responseText)}})})}function newcomment(e){return $(`
    <div class="comments" id="comment-${e._id}">
    <div>
        ${e.commentcontent}
    </div>
    <div>
        ${e.user.name}
    </div>
    <div class="delte-comment">
        <a class="delete-comment-tag" href="/comments/destroy/${e._id}">Delete Comment</a>
    </div>
</div>`)}let apply_dynamic_addcomment_to_existing_posts=function(){var e;for(e of $(".new-comment-form"))createcommment(e)},apply_dynamic_deletecomment_to_existing_comments=function(){var e;for(e of $(".delete-comment-tag"))deletecomment(e)};apply_dynamic_addcomment_to_existing_posts(),apply_dynamic_deletecomment_to_existing_comments();