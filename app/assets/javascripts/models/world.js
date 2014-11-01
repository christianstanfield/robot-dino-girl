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


function rainRedOrbs (cameraPosition) {
  for (var i = 0; i < Math.floor(Math.random()*10+5); i++) {
    var redOrb = redOrbs.create(game.world.randomX, 0, 'redOrb');
    redOrb.body.gravity.y = 100;
    redOrb.body.bounce.y = 0.7 + Math.random() * 0.2;
  }
}

function rainOrbs () {
  for (var i = 0; i < Math.floor(Math.random()*10+5); i++) {
    var orb = orbs.create(game.world.randomX, 0, 'blueOrb');
    orb.body.gravity.y = 100;
    orb.body.bounce.y = 0.7 + Math.random() * 0.2;
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
