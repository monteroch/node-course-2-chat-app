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

    socket.emit('connection', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('connection', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey, What is going on?',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is up on port: ${ port }`);
});

// app.listen(port, () => {
//     console.log(`Server is up on port ${ port }`);
// });