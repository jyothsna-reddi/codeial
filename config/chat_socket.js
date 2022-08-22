module.exports.chatSockets= function(socketserver) {
    // let io=require("socket.io")(socketserver);
    const io = require('socket.io')(socketserver, {
        cors: {
          origin: '*',
        }
      });
    io.sockets.on("connection",function(socket)
    {
        console.log("connect ack",socket.id);
       // console.log(socket);
    
        socket.on("join_room",function(data)
        {
            console.log("joining req rec : ", data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit("user_joined",data);
        })
        socket.on("send_message",function(data){
            console.log("message data received",data);
            io.in(data.chatroom).emit('recieve_message', data);
        })
    // console.log('New Connection Recieved!', socket.id);


    //     socket.on('disconnect', function()
    //     {
    //         console.log('Socket Disconnected!');
    //     });


    //     socket.on('join_room', function(data)
    //     {
    //         console.log('joining request recieved!', data);
    //         socket.join(data.chatroom);
    //         io.in(data.chatroom).emit('user_joined', data);
    //     });

        // socket.on('send_message', function(data)
        // {
        //     io.in(data.chatroom).emit('recieve_message', data);
        // })
    })
}