function GameController() {
  var player;
  var platforms;
  var cursors;
  var spacebar;
  var shootWeapon;
  var orbs;
  var score;
  var scoreText;
  var world;
  var game;
}

GameController.prototype.run = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: this.preload, create: this.create, update: this.update, render: this.render });
}

GameController.prototype.preload = function() {
  game.load.image('sky', 'assets/sky.png');
  // game.load.image('ground', 'assets/platform.png');
  game.load.image('ground', 'assets/platform copy.png');
  game.load.image('blueOrb', 'assets/safe_orb.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
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

  //  Enable physics on the player
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

  game.physics.arcade.collide(orbs, platforms);
  game.physics.arcade.collide(player, platforms);

  asteria.setVelocityX(0);

  // killDeadStars = function(star) {
  //   if (star.body.velocity.y < 1 ) {
  //     star.kill();
  //   }
  // }

  // orbs.children.forEach(killDeadStars);

  collectOrbs = function(player, orb) {
    orb.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
  }

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
