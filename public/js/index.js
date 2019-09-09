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

//Test
// socket.on('newEmail', function(email){
//     console.log('New Email: ', email);
// });

socket.emit('createMessage',{
    from: 'Amdrew',
    text: 'Yup, that works for me'
});

socket.on('newMessage', function(message){
    console.log('new Message: ', message)
})