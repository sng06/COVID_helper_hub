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
    function handleMessage({ name, message } = {}, callback) {
        io.emit('message', {message: message});
        history.push({name: name, message: message});
        callback();
    }
    socket.on('message', handleMessage)
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});