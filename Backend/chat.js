const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

let history = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    history.forEach((each) => {socket.emit('message', each)});
    function handleMessage({ user, message } = {}, callback) {
        let date = new Date();
        io.emit('message', {user: user, message: message, time: date.getTime()});
        history.push({user: user, message: message, time: date.getTime()});
        callback();
    }
    socket.on('message', handleMessage)
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});