var EndGame = function (game) {
  this.game = game;
};

EndGame.prototype.loadAssets = function () {
  this.game.load.image('gameover', '<%= asset_path "game_over.png" %>');
};

EndGame.prototype.setOnePlayerWinConditions = function (playerOneScore) {

  if (player.position.y > 600 || player.alive === false) {

    this.game.paused = true;
    // game.scale.stopFullScreen();
    showGameOverScreen(this.game);

    var message_layer_text = this.game.add.text(this.game.width/2-100, this.game.height/2-250, '', { fontSize: '32px', fill: '#F00' });
    message_layer_text.fixedToCamera = true;

    $.post('/level_reports',
      { 'score': playerOneScore },
      function (serverResponse) {
        var highScore = serverResponse.highScore;
        if (playerOneScore < highScore) {
          message_layer_text.text = 'Your score: ' + playerOneScore + '\nHigh score: ' + highScore;
        } else {
          message_layer_text.text = 'Your score: ' + playerOneScore + '\nNew high score!!!';
        }
// These are not currently present on screen:
        $('#stats ul').first().prepend(serverResponse.htmlString);
        $('#high-score').text("High score: " + serverResponse.highScore);
        $('#top-ten').html(serverResponse.topTenScores);
        $('#game-fullscreen').hide();
        $('#start-game-link').show();
        $('#start-two-player-link').show();
    });
  }
};

var showGameOverScreen = function (currentGame) {
  var message_layer = currentGame.add.sprite(0, 0, 'gameover');
  message_layer.width = currentGame.width;
  message_layer.height = currentGame.height;
  message_layer.fixedToCamera = true;
  message_layer.alpha = 0.5;
};
