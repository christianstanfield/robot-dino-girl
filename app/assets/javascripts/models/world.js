function World () {

};

World.prototype.setCanvas = function(game, x, y, width, height) {
  game.world.setBounds(x, y, width, height);
};

World.prototype.setCamera = function(game, player) {
  game.camera.follow(player, 2);
};

World.prototype.setFullscreen = function(game) {
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

  // Keep original size
  // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

  // Maintain aspect ratio
  // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  } else {
    game.scale.startFullScreen(false);
  }
};

World.prototype.buildWorld = function(game) {
  sky = game.add.sprite(0, 0, 'space');

  platforms = game.add.group();
  platforms.enableBody = true;

  ground = platforms.create(0, game.world.height + 60);
  ground.scale.setTo(100, 1);
  // This stops it from falling away when you jump on it
  ground.body.immovable = true;

  ledge = platforms.create(400, 400, 'cloud');

  ledge.body.immovable = true;
  ledge.body.setSize(90,35);
  ledge.lifespan = 10000;
};


function rainRedOrbs (cameraPosition) {
  for (var i = 0; i < Math.floor(Math.random()*10+5); i++) {
    var redOrb = redOrbs.create(game.world.randomX, 0, 'redOrb');
    redOrb.body.gravity.y = 100;
    redOrb.body.bounce.y = 0.7 + Math.random() * 0.2;
    redOrb.lifespan = 10000;
  }
}

function rainOrbs () {
  for (var i = 0; i < Math.floor(Math.random()*10+5); i++) {
    var orb = orbs.create(game.world.randomX, 0, 'blueOrb');
    orb.body.gravity.y = 100;
    orb.body.bounce.y = 0.7 + Math.random() * 0.2;
    orb.lifespan = 10000;
  }
}

// function rainStar () {
//   var star = stars.create(game.world.randomX, 0, 'star');
//   star.body.gravity.y = 300;
//   star.body.bounce.y = 0.7 + Math.random() * 0.2;
// }



// if (player.position.x === 600) {
//   rainStar();
// };
