var socket = io();

socket.on('connect', function(){
    //  
});

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message){
    console.log('Message: ', message.text)
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('connection', function(message){
    console.log('Message: ', message.text)
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    })
});