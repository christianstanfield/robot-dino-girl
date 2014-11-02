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
  if (player.position.y > 600 || player.alive === false) {
    this.game.paused = true;
    high_score = this.sendStats(score);
    message_layer = this.game.add.sprite(0, 0, 'lose');
    message_layer.width = this.game.width;
    message_layer.height = this.game.height;
    message_layer.fixedToCamera = true;
    message_layer.alpha = 0.5;
    message_layer_text = this.game.add.text(this.game.width/2, this.game.height/2+20, 'Your score: '+score+'\n'+$('#high-score').text(), { fontSize: '32px', fill: '#F00' })
    message_layer_text.fixedToCamera = true;
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

  $.post(urlTwo, data, function(serverResponse, status, jqXHR) {
    $('#stats ul').first().prepend(serverResponse.htmlString);
    $('#high-score').text("High score: " + serverResponse.highScore)
  });
}
