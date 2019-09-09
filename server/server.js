const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user  connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey, What is going on?',
        createdAt: 123
    });

    //this was a test
    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail: ', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('Create message: ', message);
    })

    socket.emit('newMessage', {
        from: 'John',
        text: 'See you then',
        createdAt: 123
    });

});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is up on port: ${ port }`);
});

// app.listen(port, () => {
//     console.log(`Server is up on port ${ port }`);
// });