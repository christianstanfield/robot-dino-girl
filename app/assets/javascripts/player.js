var Asteria = function(game, x, y) {
  this.sprite = game.add.sprite(x, y, 'dude');
}

// Create functions

// Asteria.prototype = Object.create(Phaser.Sprite.prototype);

Asteria.prototype.entersTheScene = function() {
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.gravity.y = 300;
  this.sprite.body.collideWorldBounds = true;
}

Asteria.prototype.setMotions = function() {
  this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
  this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
}

// Update functions

Asteria.prototype.moveLeft = function() {

}
