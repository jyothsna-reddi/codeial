let createlike=function(t){var o=$(t).children();console.log(o),$(o[0]).on("click",function(t){var n=$(o[0]).children();t.preventDefault(),$.ajax({method:"get",url:$(o[0]).prop("href"),success:function(t){let e=$(o[1]).attr("data-likes");t.data.deleted?($(n[n.length-1]).attr("src","https://cdn-icons.flaticon.com/png/128/2961/premium/2961957.png?token=exp=1659535936~hmac=e0544d2f43eb85968923d3254157f83f"),e=parseInt(e)-1):(e=parseInt(e)+1,$(n[n.length-1]).attr("src","https://cdn-icons-png.flaticon.com/128/833/833472.png")),$(o[1]).attr("data-likes",e),$(o[1]).html(e," likes")},error:function(t){console.log("error",t)}})})},apply_dynamic_like_to_existing_posts=function(){var t;for(t of $(".togglelike-post"))createlike(t)};apply_dynamic_like_to_existing_posts();