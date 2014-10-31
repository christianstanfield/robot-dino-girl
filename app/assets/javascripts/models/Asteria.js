var Asteria = function(new_game, positionX, positionY){
  var game = new_game;
  var positionX = positionX;
  var positionY = positionY;
  var velocity = {'x': 0, 'y':0};
  this.sprite = game.add.sprite(0, 0, 'dude');

  var asteria_sprite = game.add(sprite);

  this.entersTheScene = function(){

  }

  this.setMotions = function(){

  }

  this.setVelocityX = function(number){
    velocity['x'] = number;
  }



  this.moveLeft = function(){
    velocity['x']--;
    asteria_sprite().animations['play']('left'); //.play("left");
  }

  this.moveRight = function(){
    velocity['x']++;
    asteria_sprite().animations['play']('right');
  }

  this.standStill = function(){
    sprite.animations['stop']();
  }

  this.jump = function(){
    velocity['y'] = 10
    while(velocity['y'] > -10)
    {velocity['y']--;}
  }

  this.getVelocityX = function(){
    return velocity['x'];
  }

  this.getVelocityY = function(){
    return velocity['y'];
  }
}

