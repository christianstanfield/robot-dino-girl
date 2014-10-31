function GameController() {
  var player;
  var platforms;
  var cursors;
  var spacebar;
  var shootWeapon;
  var stars;
  var score = 0;
  var scoreText;
  var world;
  var game;
}

GameController.prototype.run = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update, render: this.render });
}

GameController.prototype.preload = function() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

GameController.prototype.create = function() {
  // World driver code
  world = new World();
  world.setCanvas(game, 0, 0, 1600, 600);

  // Set fullscreen on mouseclick
  game.input.onDown.add(world.setFullscreen, game);
  // window.onload.game.add(world.setFullscreen, this);

  game.physics.startSystem(Phaser.Physics.ARCADE);

  var sky = game.add.sprite(0, 0, 'sky');
  sky.scale.setTo(10,1);

  platforms = game.add.group();
  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(10, 2);
  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;

  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;

  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  asteria = new Asteria(game, 32, game.world.height - 150);
  player = asteria.sprite;

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);
  asteria.entersTheScene();
  asteria.setMotions();

  world.setCamera(game, player);

  //  The score
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  game.input.keyboard.onUpCallback = function(event) {
    if ((event.keyCode == Phaser.Keyboard.DOWN) && player.body.touching.down) {
        asteria.stand();
        asteria.hop();
    }
  }

  // Falling stars
  stars = game.add.group();
  stars.enableBody = true;
  game.time.events.loop(Phaser.Timer.SECOND * 3, rainStars, game);
}

GameController.prototype.update = function() {

  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);

  asteria.setVelocityX(0);

  game.physics.arcade.overlap(player, stars, collectStar, null, game);

  collectStar = function(player, star) {
    star.kill();
    //  Add and update the score
    // score += 10;
    // scoreText.text = 'Score: ' + score;
  }

  if (cursors.left.isDown) {
    asteria.moveLeft();
  } else if (cursors.right.isDown) {
    asteria.moveRight();
  } else {
    asteria.standStill();
  }

  //  Allow the player to jump if they are touching the ground.
  if (spacebar.isDown && player.body.touching.down) {
    asteria.jump();
  }

  //  Autojump for star game
  // if(player.body.touching.down){
    // asteria.jump();
  // }

  if (cursors.down.isDown && player.body.touching.down && cursors.left.isDown) {
      asteria.crawlLeft();
  } else if (cursors.down.isDown && player.body.touching.down && cursors.right.isDown) {
      asteria.crawlRight();
  } else if (cursors.down.isDown && player.body.touching.down) {
      asteria.crouch();
  }

}

GameController.prototype.render = function() {

  // game.debug.cameraInfo(game.camera, 32, 32);
  // game.debug.spriteCoords(player, 32, 500);
}
