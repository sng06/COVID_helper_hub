const io = require('socket.io-client');

export default function () {
    const socket = io.connect('http://localhost:3001');

    function registerHandler(onMessageReceived) {
        socket.on('message', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('message')
    }

    socket.on('error', function (err) {
        console.log('received socket error:');
        console.log(err)
    });

    function register(name, cb) {
        socket.emit('register', name, cb)
    }

    function join(chatroomName, cb) {
        socket.emit('join', chatroomName, cb)
    }

    function leave(chatroomName, cb) {
        socket.emit('leave', chatroomName, cb)
    }

    function message(user, msg, cb) {
        socket.emit('message', {user: user, message: msg }, cb)
    }

    return {
        register,
        join,
        leave,
        message,
        registerHandler,
        unregisterHandler
    }
}