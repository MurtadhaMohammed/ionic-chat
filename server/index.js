
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {

    socket.on('disconnect', function () {
        io.emit('user-left', socket.nickname);
    });

    socket.on('set-nickname', function (nickname) {
        socket.nickname = nickname;
        io.emit('user-join', socket.nickname);
    });

    socket.on('add-message', function (message) {
        io.emit('message', { text: message.text, from: socket.nickname, created: new Date() });
    });
});


http.listen("3000", function () {
    console.log('listen on : 3000');
});