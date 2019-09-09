const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user  connected');

    socket.emit('connection', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('connection', generateMessage('Admin', 'New User Joined'));

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });


    socket.on('createMessage', (message) => {
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is up on port: ${ port }`);
});