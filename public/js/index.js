var socket = io();

socket.on('connect', function(){
    console.log("Connected to the server");

    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey, this is Andrew'
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message){
    console.log('Message: ', message.text)
})

socket.on('connection', function(message){
    console.log('Message: ', message.text)
})