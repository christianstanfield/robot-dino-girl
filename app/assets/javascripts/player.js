Asteria = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'dude');
}
// Create functions
Asteria.prototype = Object.create(Phaser.Sprite.prototype);
Asteria.prototype.constructor = Asteria;

Asteria.prototype.entersTheScene = function() {
  this.body.bounce.y = 0.2;
  this.body.gravity.y = 300;
  this.body.collideWorldBounds = true;

}

Asteria.prototype.setMotions = function() {
  this.animations.add('left', [0, 1, 2, 3], 10, true);
  this.animations.add('right', [5, 6, 7, 8], 10, true);
}

// Update functions

Asteria.prototype.moveLeft = function() {

}