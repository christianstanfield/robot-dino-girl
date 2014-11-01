function GameController() {
  var player;
  var platforms;
  var cursors;
  var spacebar;
  var shootWeapon;
  var redOrbs;
  var orbs;
  var score = 0;
  var scoreText;
  var world;
  var game;
  var healthbar;
  var endGame
}

GameController.prototype.run = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: this.preload, create: this.create, update: this.update, render: this.render });
  endGame = new EndGame(game);
}

GameController.prototype.preload = function() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('redOrb', 'assets/unsafe_orb.png');
  game.load.image('diamond', 'assets/diamond.png')
  game.load.image('blueOrb', 'assets/safe_orb.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  endGame.loadAssets();
}

GameController.prototype.create = function() {

  // CREATE THE WORLD
  world = new World();
  world.setCanvas(game, 0, 0, 1600, 600);

  // Set fullscreen on mouseclick
  game.input.onDown.add(world.setFullscreen, game);

  game.physics.startSystem(Phaser.Physics.ARCADE);

  var sky = game.add.sprite(0, 0, 'sky');
  sky.scale.setTo(10,1);

  platforms = game.add.group();
  //  Enable physics
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height + 60);
  ground.scale.setTo(100, 1);
  // This stops it from falling away when you jump on it
  ground.body.immovable = true;

  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;

  // CREATE ASTERIA
  asteria = new Asteria(game, 500, 0);
  player = asteria.sprite;

  // Initializing asteria's healthbar //
 
  player.maxHealth = 5
  player.health = 5

  healthbar = game.add.group();
  for (var i = 0; i < 5; i++) {
    var diamond = healthbar.create(i * 20, 0, 'diamond');
  }

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);
  asteria.entersTheScene();
  asteria.setMotions();

  // Set the camera
  world.setCamera(game, player);

  //  SET CONTROLS
  cursors = game.input.keyboard.createCursorKeys();
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  game.input.keyboard.onUpCallback = function(event) {
    if ((event.keyCode == Phaser.Keyboard.DOWN) && player.body.touching.down) {
        asteria.stand();
        asteria.hop();
    }
  }

  // Falling redOrbs
  redOrbs = game.add.group();
  redOrbs.enableBody = true;
  game.time.events.loop(Phaser.Timer.SECOND * 5, rainRedOrbs, game);

  // CREATE BLUE ORBS
  orbs = game.add.group();
  orbs.enableBody = true;
  game.time.events.loop(Phaser.Timer.SECOND * 3, rainOrbs, game);

  //  CREATE SCORE
  score = 0;
  scoreText = game.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
  scoreText.fixedToCamera = true;

}

GameController.prototype.update = function() {


  //  Collide the player and the redOrbs with the platforms
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(redOrbs, platforms);
  game.physics.arcade.collide(orbs, platforms);

  asteria.setVelocityX(0);



  collectRedOrb = function(player, redOrb) {
      redOrb.kill();
  }


  collectOrbs = function(player, orb) {
    orb.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
  }


  // Health Conditions //

  loseHealth = function() {
    if (player.health === 0){
      player.kill();
    }
    player.health -= 1
    console.log(player.health)
    healthbar.children.pop();
  }

  game.physics.arcade.overlap(player, redOrbs, loseHealth, null, game);
  game.physics.arcade.overlap(player, redOrbs, collectRedOrb, null, game);


  // Movement Conditions //

  game.physics.arcade.overlap(player, orbs, collectOrbs, null, this);

  // function collisionHandler (obj1, obj2) {
  //   obj1.kill();
  // }

  // game.physics.arcade.collide(player, ground, collisionHandler, null, this);
  // game.physics.arcade.collide(orbs, ground, collisionHandler, null, this);

  if (cursors.left.isDown) {
    asteria.moveLeft();
  } else if (cursors.right.isDown) {
    asteria.moveRight();
  } else {
    asteria.standStill();
  }

  //  Allow the player to jump if they are touching the ground.
  // if (spacebar.isDown && player.body.touching.down) {
  //   asteria.jump();
  // }

  //  Autojump for minigame
  if (player.body.touching.down) {
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

GameController.prototype.render = function() {

  // game.debug.cameraInfo(game.camera, 32, 32);
  // game.debug.spriteCoords(player, 32, 500);
}
