describe("Asteria", function() {
  var sprite, fakeGame, asteria;

  beforeEach(function(){
    // create a fake Sprite
    function Sprite() {
      this.body = {
        bounce: {x: 0, y: 0},
        velocity: {x: 0, y:0},
        gravity: {x:0, y:0},
        collideWorldBounds: true,
      }
      this.animations = {
        add: function(a,b,c,d) {return true;},
        play: function(a) {return true;},
        stop: function() {return true;}
      }
      this.crop = function() {return true;}
      this.frame = 0
      this.height = 0
    }
    sprite = new Sprite();
    spyOn(sprite.animations, 'stop');
    spyOn(sprite.animations, 'play');
    spyOn(sprite, 'crop');
    // create a fake Game
    function FakeGame() {
      this.add = {
        sprite: function(a,b,c) {return sprite;}
      }
    };
    fakeGame = new FakeGame();
    asteria = new Asteria(fakeGame, 0, 0);
  });

  it("can move left", function(){
    asteria.moveLeft();
    expect(asteria.getVelocityX()).toBeLessThan(0);
    expect(sprite.animations.play).toHaveBeenCalledWith('left');
  });

  it("can move right", function(){
    asteria.moveRight();
    expect(asteria.getVelocityX()).toBeGreaterThan(0);
    expect(sprite.animations.play).toHaveBeenCalledWith('right');
  });

  it("can stand still", function(){
    asteria.standStill();
    expect(sprite.animations.stop).toHaveBeenCalled();
  });

  it("can jump", function(){
    asteria.jump();
    expect(asteria.getVelocityY()).toBeLessThan(0);
  });

  it("can crawl left", function(){
    asteria.crawlLeft();
    expect(asteria.getVelocityX()).toBeLessThan(0);
    expect(sprite.animations.play).toHaveBeenCalledWith('left');
    expect(sprite.animations.stop).toHaveBeenCalled();
  });

  it("can crawl right", function(){
    asteria.crawlRight();
    expect(asteria.getVelocityX()).toBeGreaterThan(0);
    expect(sprite.animations.play).toHaveBeenCalledWith('right');
    expect(sprite.animations.stop).toHaveBeenCalled();
  });

  it("can hop", function(){
    asteria.hop();
    expect(asteria.getVelocityY()).toBeLessThan(0);
  });

});
