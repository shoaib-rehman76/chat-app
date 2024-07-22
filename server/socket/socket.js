// const { Server } = require('socket.io')
// const express = require('express')
// const app = express()
// const http = require('http')

// const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: ['http://localhost:5173', '*'],
//         methods: ['GET', 'POST']
//     }
// })

// io.on('connection', (socket) => {
//     console.log('user connected', socket.id);
//     socket.on('connect_error', (err) => {
//         console.error('Connection Error:', err);
//     });
// })

// module.exports = { app, io, server }

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const userSocketMap = {}; // {userId->socketId}

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

const getReceiverSocketId = (receiverId) => {
    console.log(receiverId,'at getReceiver fun');
    return userSocketMap[receiverId];
}



io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    console.log(Object.keys(userSocketMap), 'userSocketMap---------->');

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})

module.exports = { app, io, server, getReceiverSocketId };
