class chatEngine{
    
    constructor(chatBoxId, userEmail)
    {
        this.chatbox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000/');

        if (this.userEmail)
            this.connectionHandler();
    }
    
connectionHandler(){
    let self = this;
    this.socket.on('connect', function()
    {
        console.log("client connection received fro server");
        self.socket.emit("join_room",{
            user_email : self.userEmail,
            chatroom : "connector"
        })
        self.socket.on("user_joined",function(data){
            console.log("user joined with email :-",data.user_email)
        })
    })
    $('#send-message').click(function(event)
    {
        event.preventDefault();
        let message=$('#send-msg-input').val();
        if(message!='')
        {
            $('#send-msg-input').val('')
            self.socket.emit('send_message', {
                message:message,
                user_email:self.userEmail,
                chatroom:'connector'
            });
        }
    });

    self.socket.on('recieve_message', function(data)
    {
        console.log('Recieved some message!', data);
        let newMessage=$('<div>');
        let message_type='others-msg';
        if(data.user_email==self.userEmail)
        {
            message_type='self-msg';
        }
        newMessage.append($('<span>', {
            html:data.message
        }));
        /* break line */
        newMessage.append($('<br>'));

        newMessage.append($('<small>', {
            html:data.user_email
        }));
        newMessage.addClass(message_type);
        $('#chat-body').append(newMessage);
    })
    // $("#send-msg").click(function(){
    //     console.log("event triggered")
    //     let msg =$("#send-msg-input").val();
    //     self.socket.emit("send_message",{
    //         message : msg,
    //         user_email : self.userEmail,
    //         chatroom : "connector"
    //     }) 
    // })
    // self.socket.on("message_to_all",function(data){
    //     $("#selfmsg").val(data.message);
    // })
}

}
