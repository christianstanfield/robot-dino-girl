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


function rainRedOrbs (levelNum, color) {
  var gravity, bounce, lifespan, color, numOfOrbs;
  if (levelNum === 0) {
    gravity = 100;
    bounce = 0.7;
    lifespan = 10000;
    color = 'redOrb';
    numOfOrbs = 10;
  } // else if (levelNum === 1) {
  //   gravity = 100
  //   bounce = 0.7
  //   lifespan = 15000
  //   color = 'redOrb'
  // }
  for (var i = 0; i < Math.floor(Math.random()*numOfOrbs+5); i++) {
    var redOrb = redOrbs.create(game.world.randomX, 0, color);
    redOrb.body.gravity.y = gravity;
    redOrb.body.bounce.y = bounce + Math.random() * 0.2;
    redOrb.lifespan = lifespan;
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


// function changeOrbs () {

// }

// function rainStar () {
//   var star = stars.create(game.world.randomX, 0, 'star');
//   star.body.gravity.y = 300;
//   star.body.bounce.y = 0.7 + Math.random() * 0.2;
// }



// if (player.position.x === 600) {
//   rainStar();
// };
