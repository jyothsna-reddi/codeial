class chatEngine{constructor(e,s){this.chatbox=$("#"+e),this.userEmail=s,this.socket=io.connect("http://localhost:5000/"),this.userEmail&&this.connectionHandler()}connectionHandler(){let n=this;this.socket.on("connect",function(){console.log("client connection received fro server"),n.socket.emit("join_room",{user_email:n.userEmail,chatroom:"connector"}),n.socket.on("user_joined",function(e){console.log("user joined with email :-",e.user_email)})}),$("#send-message").click(function(e){e.preventDefault();e=$("#send-msg-input").val();""!=e&&($("#send-msg-input").val(""),n.socket.emit("send_message",{message:e,user_email:n.userEmail,chatroom:"connector"}))}),n.socket.on("recieve_message",function(e){console.log("Recieved some message!",e);let s=$("<div>"),o="others-msg";e.user_email==n.userEmail&&(o="self-msg"),s.append($("<span>",{html:e.message})),s.append($("<br>")),s.append($("<small>",{html:e.user_email})),s.addClass(o),$("#chat-body").append(s)})}}