$( document ).ready(function() {
  var gameController = new GameController();
  $('#start-game-link').on('click', function(){
    $('#gameDiv').html('<div></div>');
    gameController.run();
    $(this).hide();
    $('#game-fullscreen').show();
  });

  $('#game-fullscreen').on('click', function(){
    world.setFullscreen(game);
  });

  $('#new_account').on('click', function(){
    $('#login').hide();
    $('#create_account').show();
  });

  $('#return_login').on('click', function(){
    $('#create_account').hide();
    $('#login').show();
  });  

});
