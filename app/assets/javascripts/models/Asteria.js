var Asteria = function(game, x, y){
  this.sprite = game.add.sprite(x, y, 'dude');
  this.maxHealth = 5;
  this.health = 5;
};

Asteria.prototype.entersTheScene = function(){
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.gravity.y = 300;
  this.sprite.body.collideWorldBounds = false;
  this.sprite.checkWorldBounds = true;
  this.sprite.outOfBoundsKill = true;
};

Asteria.prototype.setMotions = function(){
  this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
  this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
  this.sprite.animations.add('crawlRight', [5, 6, 7, 8], 10, true);
  this.sprite.animations.add('crawlLeft', [5, 6, 7, 8], 10, true);
};

Asteria.prototype.moveLeft = function() {
  this.setVelocityX(-150);
  this.sprite.animations.play('left');
};

Asteria.prototype.moveRight = function() {
  this.setVelocityX(250);
  this.sprite.animations.play('right');
};

Asteria.prototype.standStill = function(){
  this.sprite.animations.stop();
  this.sprite.frame = 4;
};

Asteria.prototype.jump = function() {
  this.setVelocityY(-325);
}

Asteria.prototype.crouch = function() {
  this.reSize(32, 24);
  cropRect = new Phaser.Rectangle(0, 0, 32, 24);
  this.sprite.crop(cropRect);
  this.sprite.animations.stop();
  this.sprite.frame = 5;
  this.sprite.height = 24;
}

Asteria.prototype.stand = function() {
  this.reSize(32, 48);
  this.sprite.crop();
  this.sprite.height = 48;
}

Asteria.prototype.hop = function() {
  this.setVelocityY(-120);
}

Asteria.prototype.crawlRight = function() {
  this.setVelocityX(150);
  this.sprite.animations.play('right');
  this.sprite.animations.stop();
}

Asteria.prototype.crawlLeft = function() {
  this.setVelocityX(-150);
  this.sprite.animations.play('left');
  this.sprite.animations.stop();
}
// Helper methods
Asteria.prototype.setVelocityX = function(velocityX) {
  this.sprite.body.velocity.x = velocityX;
};

Asteria.prototype.getVelocityX = function() {
  return this.sprite.body.velocity.x;
};

Asteria.prototype.setVelocityY = function(velocityY) {
  this.sprite.body.velocity.y = velocityY;
};

Asteria.prototype.getVelocityY = function() {
  return this.sprite.body.velocity.y;
};

Asteria.prototype.reSize = function(sizeX, sizeY) {
  this.sprite.body.setSize(sizeX, sizeY, 0, 0)
}

Asteria.prototype.fire = function(){

};
