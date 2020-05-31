const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callBack) => {
        const [error, user] = addUser({ id: socket.id, name, room });

        if (error) return callBack(error);
    });

    socket.on('disconnect', () => {
        
    })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
