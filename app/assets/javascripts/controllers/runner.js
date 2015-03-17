$( document ).ready(function() {

  $('#start-game-link').on('click', function(event){
    event.preventDefault();
    startGame(1);
  });

   $('#start-two-player-link').on('click', function(event){
    event.preventDefault();
    startGame(2);
  });


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

var startGame = function (numOfPlayers) {

  $('#gameDiv').html('');
  $('#start-game-link').hide();
  $('#start-two-player-link').hide();
  $('#view-my-stats').hide();
  $('#all-stats').hide();
  $('#headline').addClass('hide');
  $('#game-fullscreen').removeClass('hide');
  $('#game-fullscreen').addClass('show');

  game.run(numOfPlayers);

  $.get('/game_reports', function(serverResponse, status, jqXHR) {
    // Do things with serverResponse here
  });
};
