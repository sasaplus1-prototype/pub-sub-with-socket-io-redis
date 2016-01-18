'use strict';

process.on('uncaughtException', function(err) {
  console.error('uncaughtException');
  console.error(err);

  process.exit(1);
});

var express = require('express'),
    socketio = require('socket.io'),
    socketioRedis = require('socket.io-redis');

var app = express(),
    server, io;

app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

server = app.listen(3000, function() {
  console.log('server starting at 127.0.0.1:3000');
});

io = socketio(server);
io.adapter(socketioRedis());
io.on('connection', function(socket) {
  setInterval(function() {
    socket.emit('send random value', {
      value: Math.random()
    });
  }, 1000);
});
