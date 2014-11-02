var Websockets = function(){

  var connect = function(){
    var socket = io();
    var debug = require('debug')('test');
    var app = require('../app');
    var server = app.listen(3000);
    var io = require('socket.io').listen(server);

    // io.on('connection', function(socket){
    //     socket.on('paddle-mov', function(send, inx){
    //         if (send.send == true) {
    //             socket.broadcast.emit('paddle-mov-back', inx);
    //             send.send = false;
    //         };
    //     });
    // });
  };

  var setEventHandlers = function() {
    // Socket connection successful
    socket.on("connect", onSocketConnected);
    // Socket disconnection
    socket.on("disconnect", onSocketDisconnect);
    // New player message received
    socket.on("new player", onNewPlayer);
    // Player move message received
    socket.on("move player", onMovePlayer);
    // Player removed message received
    socket.on("remove player", onRemovePlayer);
  };
}


