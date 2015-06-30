(function() {
  if (typeof Breakout === "undefined") {
  window.Breakout = {};
  }

  var Game = Breakout.Game = function() {
  };

  Game.DIM_X = window.innerWidth - 50;
  Game.DIM_Y = window.innerHeight - 50;
  Game.FPS = 60;
  Game.paddleStart = [Math.floor(Game.DIM_X / 2), Math.floor(Game.DIM_Y - 50)];
  Game.paddle = new Breakout.paddle(Game.paddleStart);
  Game.ball = new Breakout.ball();

  Game.prototype.drawWalls = function(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(50, Game.DIM_Y - 100);
    ctx.lineTo(50, 50);
    ctx.lineTo(Game.DIM_X - 50, 50);
    ctx.lineTo(Game.DIM_X - 50, Game.DIM_Y - 100);
    ctx.lineWidth=10;
    ctx.stroke();
  };

  Game.prototype.createBricks = function() {
    var rows = 3;
    var brickSize = Math.floor((Game.DIM_X - 120) / 20);
    var startPos = 60;
    var height = 100;
    this.bricks = [];
    for (var i = 1; i <= rows; i++) {
      var row = [];
      for(var j = 1; j < 20 - 1 + (i % 2); j++) {
        var brick = new Breakout.Brick(brickSize, [startPos, height + i * 50]);
        row.push(brick);
        startPos += brickSize + 5;
      }
      this.bricks.push(row);
      startPos = 60 + ((i % 2) * (brickSize / 2));
    }
  };

  Game.prototype.drawBricks = function(ctx) {

    this.bricks.forEach(function(row) {
      row.forEach(function(brick) {
        brick.render(ctx);
      });
    });
  };

  Game.prototype.detectCollision = function() {
    var ball = Game.ball;
    var paddle = Game.paddle;
    if (ball.position[1] <= 55 + ball.radius) {
      ball.bounce('xAxis');
    } else if (
      ((ball.position[1] >= paddle.position[1]) && (ball.position[1] <= paddle.position[1] + 5)) &&
         (ball.position[0] > paddle.position[0] &&
          (ball.position[0] < paddle.position[0] + paddle.paddleSize))
      ) {
      ball.bounce('xAxis', ((ball.position[0] - paddle.position[0]) - (paddle.paddleSize / 2)));
    } else if (ball.position[0] <= 55) {
      ball.bounce('yAxis');
    } else if (ball.position[0] >= Game.DIM_X - 55) {
      ball.bounce('yAxis');
    }
  };

  Game.prototype.detectLoss = function(ctx) {
    if (Game.ball.position[1] > Game.DIM_Y) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.draw = function (ctx) {
    //Clear game
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.drawWalls(ctx);
    this.drawBricks(ctx);
    Game.paddle.draw(ctx);

    Game.ball.draw(ctx);
  };

  Game.prototype.endGame = function(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("FAIL!",Game.DIM_X / 2, Game.DIM_Y / 2);
  };

  Game.prototype.step = function() {
    Game.ball.move();
  };


})();
