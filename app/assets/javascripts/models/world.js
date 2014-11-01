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


function rainStars (cameraPosition) {
  for (var i = 0; i < 12; i++) {
    //  Create a star inside of the 'stars' group
    var star = stars.create(i * 70 + cameraPosition, 0, 'star');

    //  Let gravity do its thing
    star.body.gravity.y = 300;

    //  This just gives each star a slightly random bounce value
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }
}

function rainStar () {
  var star = stars.create(player.position.x, 0, 'star');
  star.body.gravity.y = 300;
  star.body.bounce.y = 0.7 + Math.random() * 0.2;
}
