$( document ).ready(function() {


  $('#start-game-link').on('click', function(event){
    event.preventDefault();
    startGame();
  });

   $('#start-two-player-link').on('click', function(event){
    event.preventDefault();
    startTwoPlayerGame();
  });

  // $('.start-two-player-link').on('click', function(event){
  //   event.preventDefault();
  //   startTwoPlayerGame();
  // });

  // $('.start-game-link').on('click' function(event){
  //   event.preventDefault();
  //   startGame();
  // });



  $('#view-my-stats').on('click', function(event){
    event.preventDefault();
    $('#all-stats').show();
  });

  $('#game-fullscreen').on('click', function(event){
    event.preventDefault();
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

function startGame(){
  var gameController = new GameController();
  gameController.run();
  $('#start-game-link').hide();
  $('#view-my-stats').hide();
  $('#all-stats').hide();
  $('#headline').addClass('hide');
  $('#game-fullscreen').removeClass('hide');
  $('#game-fullscreen').addClass('show');

  $.get('/game_reports', function(serverResponse, status, jqXHR) {
    // Do things with serverResponse here
  });
}

function startTwoPlayerGame() {
  var gameController = new TwoPlayerGameController();
  gameController.run();
  $('#start-two-player-link').hide();
  $('#view-my-stats').hide();
  $('#headline').addClass('hide');
  $('#all-stats').hide();
   $('#game-fullscreen').removeClass('hide');
  $('#game-fullscreen').addClass('show');
  $.get('/game_reports', function(serverResponse, status, jqXHR) {
    // Do things with serverResponse here
  });
}
