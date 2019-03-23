const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

connections = [];

http.listen(process.env.PORT || 3000);
console.log('Server running ...');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

app.get('/handleDom.js', (req, res) => {
    res.sendFile(__dirname + '/src/handleDom.js');
});

io.on('connection', (socket) => {

    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length)

    // Disconnect
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    // Send Messages
    socket.on('send messages', (msg) => {
        console.log('messages', msg);
        io.emit('send messages', msg)
    })
});


