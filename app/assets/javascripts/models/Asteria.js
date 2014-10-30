var Asteria = function(game, x, y) {
  this.sprite = game.add.sprite(x, y, 'dude');
}

Asteria.prototype.entersTheScene = function() {
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.gravity.y = 300;
  this.sprite.body.collideWorldBounds = true;
}

Asteria.prototype.setMotions = function() {
  this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
  this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
}

Asteria.prototype.setVelocityX = function(xVelocity) {
  this.sprite.body.velocity.x = xVelocity;
  // this.sprite.body.velocity.y = 0;
}

Asteria.prototype.moveLeft = function() {
  this.sprite.body.velocity.x = -150;
  this.sprite.animations.play('left');
}

Asteria.prototype.moveRight = function() {
  this.sprite.body.velocity.x = 150;
  this.sprite.animations.play('right');
}

Asteria.prototype.standStill = function() {
  this.sprite.animations.stop();
  this.sprite.frame = 4;
}

Asteria.prototype.jump = function() {
  this.sprite.body.velocity.y = -350;
}
