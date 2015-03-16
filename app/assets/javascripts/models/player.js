function Player (game, x, y, spriteName) {
  this.sprite = game.add.sprite(x, y, spriteName);
  this.maxHealth = 5;
  this.health = 5;
}

Player.prototype.enterGame = function () {
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.gravity.y = 300;
  this.sprite.body.collideWorldBounds = false;
};

Player.prototype.setSpriteMotion = function () {
  this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
  this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
};

// Player movement
Player.prototype.moveLeft = function () {
  this.setVelocityX(-150);
  this.sprite.animations.play('left');
};

Player.prototype.moveRight = function () {
  this.setVelocityX(250);
  this.sprite.animations.play('right');
};

Player.prototype.standStill = function (){
  this.sprite.animations.stop();
  this.sprite.frame = 4;
};

Player.prototype.jump = function () {
  this.setVelocityY(-325);
};

// Helper methods
Player.prototype.setVelocityX = function (velocityX) {
  this.sprite.body.velocity.x = velocityX;
};

Player.prototype.getVelocityX = function () {
  return this.sprite.body.velocity.x;
};

Player.prototype.setVelocityY = function (velocityY) {
  this.sprite.body.velocity.y = velocityY;
};

Player.prototype.getVelocityY = function () {
  return this.sprite.body.velocity.y;
};
