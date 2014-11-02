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

  var setEventHandlers = function(socket) {
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


  function onSocketConnected() {
    console.log("Connected to socket server");
    // Send local player data to the game server
    socket.emit("new player", {x: player.x, y:player.y});
  };

  // Socket disconnected
  function onSocketDisconnect() {
      console.log("Disconnected from socket server");
  };

  // New player
  function onNewPlayer(data) {
      console.log("New player connected: "+data.id);
      // Add new player to the remote players array
      enemies.push(new RemotePlayer(data.id, game, player, data.x, data.y));
  };

  // Move player
  function onMovePlayer(data) {

      var movePlayer = playerById(data.id);
      // Player not found
      if (!movePlayer) {
          console.log("Player not found: "+data.id);
          return;
      };
      // Update player position
      movePlayer.player.x = data.x;
      movePlayer.player.y = data.y;

  };

  // Remove player
  function onRemovePlayer(data) {
      var removePlayer = playerById(data.id);
      // Player not found
      if (!removePlayer) {
          console.log("Player not found: "+data.id);
          return;
      };
      removePlayer.player.kill();
      // Remove player from array
      enemies.splice(enemies.indexOf(removePlayer), 1);
  };
}


