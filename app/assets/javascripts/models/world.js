var World = function() {
  this.height;
  this.width;
  var canvas;

  this.setCanvas = function(game, positionX, positionY, width, height) {
    canvas = {
      game: game,
      positionX: positionX,
      positionY: positionY,
      width: width,
      height: height
    };
    this.canvas = canvas;
  }
  this.setFullscreen = function(){};

  this.setCamera = function(game, player){};

  // this.add = function(e){

  // }
}
