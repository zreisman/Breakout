(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var GameView = Breakout.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;

  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    window.addEventListener('mousemove', function(e) {
       Breakout.Game.paddle.move(e.clientX);
    });
    window.addEventListener('keyup', function(e) {
      if (e.keyCode === 32) {
        Breakout.Game.ball.fire();
      }
    });
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var gameView = this;
    gameView.game.createBricks();
    this.timerId = setInterval(
      function () {


        gameView.game.detectCollisions();
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        if (!Breakout.Game.ball.fired) {
          gameView.game.instructions(gameView.ctx);
        }
        if (gameView.game.detectLoss()) {
          gameView.stop();
        }
      }, 1000 / Breakout.Game.FPS
    );

  };

  Breakout.GameView.prototype.stop = function () {
    clearInterval(this.timerId);
    this.game.endGame(this.ctx);
  };

})();
