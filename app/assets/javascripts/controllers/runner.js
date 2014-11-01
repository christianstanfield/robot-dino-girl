$( document ).ready(function() {
  $('#start-game-link').on('click', function(){
    var gameController = new GameController();
    gameController.run();
  });
});
