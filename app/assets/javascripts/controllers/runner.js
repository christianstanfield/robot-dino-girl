$( document ).ready(function() {


  $('#start-game-link').on('click', startGame);

  $('#game-fullscreen').on('click', function(){
    world.setFullscreen(game);
  });

  $(document).on('click', '#new_account', function(){
    $('#login').hide();
    $('#create_account').show();
  });

  $(document).on('click', '#return_login', function(){
    $('#create_account').hide();
    $('#login').show();
  });

});

function startGame() {
  var gameController = new GameController();
  $('#gameDiv').html('<div></div>');
  gameController.run();
  $('#start-game-link').hide();
  $('#game-fullscreen').show();
  $.get('/game_reports', function(serverResponse, status, jqXHR) {
    // Do things with serverResponse here
  });
}
