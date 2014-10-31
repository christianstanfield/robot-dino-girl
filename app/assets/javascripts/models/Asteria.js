var Asteria = function(new_game, positionX, positionY){
  var game = new_game;
  var positionX = positionX;
  var positionY = positionY;
  var velocity = {x: 0, y:0};
  this.sprite = game.add.sprite(0, 0, 'dude');

  // var asteria_sprite = game.add(sprite);

  this.entersTheScene = function(){

  }

  this.setMotions = function(){
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
  }

  this.setVelocityX = function(number){
    this.sprite.body.velocity.x = number;
  }

  this.moveLeft = function(){
    console.log("Left");
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.body.velocity.x = -200;
    console.log(this.sprite.body.velocity);
    // asteria_sprite().animations['play']('left'); //.play("left");
  }

  this.moveRight = function(){
    console.log("Right");
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.sprite.body.velocity.x = 200;
    console.log(this.sprite.body.velocity);
    // asteria_sprite().animations['play']('right');
  }

  this.standStill = function(){
    console.log("Stopped");
    // this.sprite.animations.add('stop');
  }

  this.jump = function(){
    this.sprite.body.velocity.y = -1500
    // while(this.sprite.body.velocity.y > -10)
    // {this.sprite.body.velocity.y--;}
  }

  this.getVelocityX = function(){
    return this.sprite.body.velocity.x;
  }

  this.getVelocityY = function(){
    return this.sprite.body.velocity.y;
  }
}

