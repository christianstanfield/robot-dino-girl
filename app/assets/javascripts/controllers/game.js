function GameController() {
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
  this.background;
  this.hitBox;
  this.level;
}

GameController.prototype.run = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: this.preload, create: this.create, update: this.update, render: this.render });
  endGame = new EndGame(game);
}

GameController.prototype.preload = function() {
  game.load.image('space', 'assets/space.jpg');
  game.load.image('levelTwo', 'assets/wormhole.jpg');
  game.load.image('cloud', 'assets/cloud-sprite.png');
  game.load.image('redOrb', 'assets/unsafe_orb.png');
  game.load.image('heart', 'assets/heart-sprite.png')
  game.load.image('blueOrb', 'assets/safe_orb.png');
  game.load.image('hitBox', 'assets/red.jpg');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  endGame.loadAssets();
}

GameController.prototype.create = function() {
  this.level = 0;
  // CREATE THE WORLD
  world = new World();
  world.setCanvas(game, 0, 0, 1280, 600);

  // Set fullscreen on mouseclick
  game.input.onDown.add(world.setFullscreen, game);

  game.physics.startSystem(Phaser.Physics.ARCADE);

  this.background = game.add.sprite(0, 0, 'space');
  // sky.scale.setTo(10,1);

  platforms = game.add.group();
  //  Enable physics
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height + 60);
  ground.scale.setTo(100, 1);
  // This stops it from falling away when you jump on it
  ground.body.immovable = true;

  ledge = platforms.create(400, 400, 'cloud');

  ledge.body.immovable = true;
  ledge.body.setSize(90,35);
  ledge.lifespan = 10000;

  // CREATE ASTERIA
  asteria = new Asteria(game, 450, 0);
  player = asteria.sprite;

  // Initializing asteria's healthbar //

  // player.maxHealth = 5
  // player.health = 5

  healthbar = game.add.group();
  for (var i = 0; i < 5; i++) {
    var diamond = healthbar.create((i * 40)+16, 16, 'heart');
  }

  healthbar.fixedToCamera = true;

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
  game.time.events.loop(Phaser.Timer.SECOND * 5, rainRedOrbs(0, 'redOrb'), game);

  // CREATE BLUE ORBS
  orbs = game.add.group();
  orbs.enableBody = true;
  rainOrbs();
  game.time.events.loop(Phaser.Timer.SECOND * 3, rainOrbs, game);

  //  CREATE SCORE
  score = 0;
  scoreText = game.add.text(650, 16, 'Score: ' + score, { fontSize: '32px', fill: '#FFF' });
  scoreText.fixedToCamera = true;

}

GameController.prototype.update = function() {



  //  Collide the player and the redOrbs with the platforms
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(redOrbs, platforms);
  game.physics.arcade.collide(orbs, platforms);

  asteria.setVelocityX(0);

  // killDeadOrbs = function(orb) {
  //   if (orb.body.velocity.y < 1 ) {
  //     orb.bounceCount += 1;
  //     console.log(orb.bounceCount);
  //   }
  //   if (orb.bounceCount > 2) {
  //     orb.kill();
  //   }
  // }

  // orbs.children.forEach(killDeadOrbs);

  ledge.alpha = ledge.lifespan / 10000;

  redOrbs.forEachAlive(function(orb){
    orb.alpha = orb.lifespan / 10000;
  });

  orbs.forEachAlive(function(orb){
    orb.alpha = orb.lifespan / 10000;
  });

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
    if (asteria.health === 1){
      player.kill();
    }
    asteria.health -= 1
    healthbar.children.pop();
    hitBox = game.add.sprite( 0, 0, 'hitBox')
    game.world.bringToTop(hitBox);
    hitBox.width = game.width;
    hitBox.height = game.height;
    hitBox.fixedToCamera = true;
    hitBox.lifespan = 70
    hitBox.alpha = 0.7
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

  // next level stuff
  if (score > 20 && this.level === 0) {
    this.level += 1;
    this.background.kill();
    this.background = game.add.sprite(0, 0, 'levelTwo');
    game.world.moveDown(this.background);
    game.world.bringToTop(player);
    game.world.bringToTop(orbs);
    game.world.bringToTop(redOrbs);
    game.world.bringToTop(healthbar);
    game.world.bringToTop(scoreText);
    game.time.events.stop();
    game.time.events.loop(Phaser.Timer.SECOND * 5, rainRedOrbs(1, 'redOrb'), game);
  }

  // end game score sending call
  endGame.setConditions(score);
}

GameController.prototype.render = function() {

  // game.debug.cameraInfo(game.camera, 32, 32);
  // game.debug.spriteCoords(player, 32, 500);
  // game.debug.body(platforms.children[1]);
}
