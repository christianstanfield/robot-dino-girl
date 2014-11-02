function LevelTwoController() {
  this.player;
  this.platforms;
  this.cursors;
  this.spacebar;
  this.shootWeapon;
  this.orbs;
  this.redOrbs;
  this.score;
  this.scoreText;
  this.world;
  this.game;
  this.healthbar;
  this.endGame;
  this.ledge;
  this.tileMap
}

LevelTwoController.prototype.run = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'LevelTwoDiv', { preload: this.preload, create: this.create, update: this.update, render: this.render });
  endGame = new EndGame(game);
  tileMap = new TileMapper(game, 'assets/csv_map.csv', 'assets/techblocks2_2.png')
}

LevelTwoController.prototype.preload = function() {
  game.load.image('space', 'assets/insane_cloud_background.jpg');
  game.load.image('cloud', 'assets/cloud-sprite.png');
  game.load.image('redOrb', 'assets/unsafe_orb.png');
  game.load.image('heart', 'assets/heart-sprite.png')
  game.load.image('blueOrb', 'assets/safe_orb.png');
  game.load.image('hitBox', 'assets/red.jpg');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  endGame.loadAssets();
  tileMap.loadAssets('sheet', 'map');
}

LevelTwoController.prototype.create = function() {

  // CREATE THE WORLD
  world = new LevelTwo();
  world.setCanvas(game, 0, 0, 6000, 6000);

  // Set fullscreen on mouseclick
  game.input.onDown.add(world.setFullscreen, game);

  game.physics.startSystem(Phaser.Physics.ARCADE);

  var sky = game.add.sprite(0, 0, 'space');
  // sky.scale.setTo(10,1);

  platforms = game.add.group();
  //  Enable physics
  platforms.enableBody = true;

  ledge = platforms.create(400, 400, 'cloud');

  ledge.body.immovable = true;
  ledge.body.setSize(90,35);
  // ledge.lifespan = 10000;

  // CREATE ASTERIA
  asteria = new Asteria(game, 450, 0);
  player = asteria.sprite;

  // Start creating tiles

  // Initializing asteria's healthbar //

  healthbar = game.add.group();
  for (var i = 0; i < 5; i++) {
    var diamond = healthbar.create((i * 40)+16, 16, 'heart');
  }

  sky.fixedToCamera = true;
  healthbar.fixedToCamera = true;

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);
  asteria.entersTheScene();
  asteria.setMotions();

  // Set the camera
  game.camera.follow(player);

  //  SET CONTROLS
  cursors = game.input.keyboard.createCursorKeys();
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  tileMap.createTiles('map', 'tileImage', 'sheet', [[0, 64]])
  game.input.keyboard.onUpCallback = function(event) {
    if ((event.keyCode == Phaser.Keyboard.DOWN) && player.body.touching.down) {
        asteria.stand();
        asteria.hop();
    }
  }

}

LevelTwoController.prototype.update = function() {

  //  Collide the player and the redOrbs with the platforms
  game.physics.arcade.collide(player, platforms);

  asteria.setVelocityX(0);

  // Add collisions and shit with tiles
  tileMap.updateTiles([player])

  // Health Conditions //
  loseHealth = function() {
    if (asteria.health === 1){
      player.kill();
    }
    asteria.health -= 1
    healthbar.children.pop();
    hitBox = game.add.sprite( 0, 0, 'hitBox')
    hitBox.width = game.width;
    hitBox.height = game.height;
    hitBox.fixedToCamera = true;
    hitBox.lifespan = 70
    hitBox.alpha = 0.7
  }

  if (cursors.left.isDown) {
    asteria.moveLeft();
  } else if (cursors.right.isDown) {
    asteria.moveRight();
  } else {
    asteria.standStill();
  }

  if (spacebar.isDown && player.body.blocked.down) {
    asteria.jump();
  }

  if (cursors.down.isDown && player.body.touching.down && cursors.left.isDown) {
      asteria.crawlLeft();
  } else if (cursors.down.isDown && player.body.touching.down && cursors.right.isDown) {
      asteria.crawlRight();
  } else if (cursors.down.isDown && player.body.touching.down) {
      asteria.crouch();
  }
}

LevelTwoController.prototype.render = function() {

}
