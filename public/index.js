'use strict';

var socket = io('http://127.0.0.1:3000');

socket.on('send random value', function(data) {
  console.log(data);
});
