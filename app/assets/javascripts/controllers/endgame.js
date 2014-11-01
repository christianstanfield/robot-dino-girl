var EndGame = function(game){
  this.game = game
}

EndGame.prototype.loadAssets = function() {
  // Loading images for losing and winning screens
  this.game.load.image('win', 'assets/YouWin.png');
  this.game.load.image('lose', 'assets/YouLose.jpg');
}

EndGame.prototype.setConditions = function(score){
  // Set WIN condition in the IF CONDITIONAL
    if (player.position.x >= 600) {
        this.game.paused = true;
        this.game.add.sprite(0, 0, 'win');
        this.sendStats(score);
    };

  // Set LOSE condition in the IF CONDITIONAL
      // if (player.position.x >= 600) {
      //   game.paused = true
      //   game.add.sprite(0, 0, 'lose')
      // };
}

EndGame.prototype.sendStats = function(score){
  var urlOne = '/game_reports',
      urlTwo = '/level_reports',
      data = { 'score': score };
  $.get(urlOne, function(serverResponse, status, jqXHR) {
    // Do things with serverResponse here
  });
  $.post(urlTwo, data, function(serverResponse, status, jqXHR) {
    // Do things with serverResponse here
  });
}

// User.first.game_reports.first.level_reports.new
