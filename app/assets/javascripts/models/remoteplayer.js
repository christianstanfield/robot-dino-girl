var pos = this.paddle.position.x;

      if (this.cursor.right.isDown){
            that.paddle.body.velocity.x = 350;
            socket.emit('paddle-mov', {send:true}, pos);
      }
      else if (this.cursor.left.isDown) {
            that.paddle.body.velocity.x = -350;
            socket.emit('paddle-mov', {send:true}, pos);
      }
      else {
        that.paddle.body.velocity.x = 0;
        socket.emit('paddle-mov', {send:true}, pos);
      }

      socket.on('paddle-mov-back', function(inx){
            console.log(inx);
            that.paddle.position.x = inx;
        });



var RemotePlayer = function(index, game, player, startX, startY){

  var x = startX;
  var y = startY;

  this.game = game;
  this.health = 3;
  this.player = player;
  this.alive = true;

  this.player = game.add.sprite(x, y, 'enemy');

  this.player.animations.add('move', [0,1,2,3,4,5,6,7], 20, true);
  this.player.animations.add('stop', [3], 20, true);

  this.player.anchor.setTo(0.5, 0.5);

  this.player.name = index.toString();
  this.player.body.immovable = true;
  this.player.body.collideWorldBounds = true;

  this.player.angle = game.rnd.angle();

  this.lastPosition = { x: x, y: y }
};

RemotePlayer.prototype.update = function() {
  if(this.player.x != this.lastPosition.x || this.player.y != this.lastPosition.y) {
      this.player.play('move');
      this.player.rotation = Math.PI + game.physics.angleToXY(this.player, this.lastPosition.x, this.lastPosition.y);
  } else {
      this.player.play('stop');
  }

  this.lastPosition.x = this.player.x;
  this.lastPosition.y = this.player.y;
};

}
