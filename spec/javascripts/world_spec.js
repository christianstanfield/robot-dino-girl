describe("World", function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update, render: this.render });
  var world = new World();
  var asteria = new Asteria(game, 32, game.world.height - 150);
  var player = asteria.sprite;

  it("can set the canvas dimensions", function(){
    world.setCanvas(game, 0, 0, 2400, 600);
    
    expect(game.world.width).toEqual(2400);
    expect(game.world.height).toEqual(600);
    expect(game.world.x).toEqual(0);
    expect(game.world.y).toEqual(0);
  });

  it("can set the camera to follow player", function(){
    world.setCamera(game, player);
    
    
  });


});