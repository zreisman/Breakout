(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var GameView = Breakout.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;

  };

  GameView.MOVES = {
    "up": [ 0, -1],
    "left": [-1,  0],
    "down": [ 0,  1],
    "right": [ 1,  0],
  };


  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    $(document.body).on('keydown', function(e) {
       switch (e.which) {

         case 37:
             Breakout.Game.paddle.move(GameView.MOVES["left"]);
             break;

         case 39:
             Breakout.Game.paddle.move(GameView.MOVES["right"]);
             break;

       }
     });
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var gameView = this;
    this.timerId = setInterval(
      function () {

        gameView.game.step();
        gameView.game.detectCollision();
        gameView.game.draw(gameView.ctx);
        if (gameView.game.detectLoss()) {
          gameView.stop();
        };
      }, 1000 / Breakout.Game.FPS
    );

  };

  Breakout.GameView.prototype.stop = function () {
    clearInterval(this.timerId);
    this.game.endGame(this.ctx);
  };

})();
