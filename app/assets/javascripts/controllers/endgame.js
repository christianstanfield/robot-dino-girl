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
  if (player.alive === false) {
    this.game.paused = true;
    message_layer = this.game.add.sprite(200, 150, 'win');
    message_layer.fixedToCamera = true
    this.sendStats(score);
    $('#game-fullscreen').hide();
    $('#start-game-link').show();
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
    $('#stats ul').first().prepend(serverResponse);
  });
}


