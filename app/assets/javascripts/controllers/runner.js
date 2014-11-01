$( document ).ready(function() {
  var gameController = new GameController();
  $('#start-game-link').on('click', function(){
    gameController.run();
    $(this).hide();
  });

});
