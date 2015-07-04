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
  Game.leftWall = [[50, Game.DIM_Y - 60], [50, 50]];
  Game.topWall = [[50, 50], [Game.DIM_X - 50, 50]];
  Game.rightWall = [[Game.DIM_X - 50, 50], [Game.DIM_X - 50, Game.DIM_Y - 60]];
  Game.wallThickness = 10;
  Game.walls = [Game.leftWall, Game.topWall, Game.rightWall];


  Game.prototype.drawWalls = function(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(Game.leftWall[0][0], Game.leftWall[0][1]);
    ctx.lineTo(Game.leftWall[1][0], Game.leftWall[1][1]);
    ctx.lineTo(Game.topWall[1][0], Game.topWall[1][1]);
    ctx.lineTo(Game.rightWall[1][0], Game.rightWall[1][1]);
    ctx.lineWidth=Game.wallThickness;
    ctx.stroke();
  };

  Game.prototype.detectCollisions = function() {
    var that = this;
    var ballPath = Game.ball.futurePath();

    // Detect collision with walls
    Game.walls.forEach(function(wall) {
      if (that.boundingIntersects(ballPath[0], ballPath[1], wall[0], wall[1])) {
        Game.ball.bounce(wall, 0);
      }
    });

    // Detect paddle hit
    var space  = Game.paddle.space();
    var topEdge = Game.paddle.topEdge();
    var intersect = that.lineIntersects(ballPath[0], ballPath[1], topEdge[0], topEdge[1]);
    if (intersect) {
      var skew = Game.ball.position[0] - Game.paddle.position[0];
      var deflection = (skew - (Game.paddle.paddleSize / 2));
      Game.ball.bounce(topEdge, deflection);
    }

    // Detect brick collisions
    that.bricks.forEach(function(row) {
      for(var i = 0; i < row.length; i++) {
        var brick = row[i];
        if (that.boundingIntersects(brick.vertA, brick.vertC, ballPath[0], ballPath[1])) {
          brick.segments.forEach(function(seg) {
            var intersect = that.lineIntersects(seg[0], seg[1], ballPath[0], ballPath[1]);
            if (intersect) {
              Game.ball.bounce(seg, 0);
              row.splice(i, 1);
            }

          })
        }
      }
    })
  };

  Game.prototype.distanceBetween = function(A, B) {
    return Math.sqrt( Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  };

  Game.prototype.createBoundingBox = function(segStart, segEnd) {
    var xMin = Math.min(segStart[0], segEnd[0]);
    var yMax = Math.max(segStart[1], segEnd[1]);
    var yMin = Math.min(segStart[1], segEnd[1]);
    var xMax = Math.max(segStart[0], segEnd[0]);
    var upperLeft = [xMin, yMax];
    var lowerRight = [xMax, yMin];
    return [upperLeft, lowerRight];
  };

  Game.prototype.boundingIntersects = function(seg1A, seg1B, seg2A, seg2B) {
    var a = this.createBoundingBox(seg1A, seg1B);
    var b = this.createBoundingBox(seg2A, seg2B);
    return (a[0][0] <= b[1][0] &&
            a[1][0] >= b[0][0] &&
            a[0][1] >= b[1][1] &&
            a[1][1] <= b[0][1]);
  };

  Game.prototype.lineIntersects = function(seg1A, seg1B, seg2A, seg2B) {
    var x1 = seg1A[0], y1 = seg1A[1], x2 = seg1B[0], y2 = seg1B[1];
    var x3 = seg2A[0], y3 = seg2A[1], x4 = seg2B[0], y4 = seg2B[1];
    var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
    if (denom !== 0) {  // Was !=
      var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
      if ((ua >= 0) && (ua <= 1)) {
        var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
        if ((ub >= 0) && (ub <= 1)) {
          var x = x1 + (ua * (x2-x1));
          var y = y1 + (ua * (y2-y1));
          return { x: x, y: y };
        }
      }
    }
    return null;
  },

  Game.prototype.createBricks = function() {
    var rows = 3;
    var brickSize = Math.floor((Game.DIM_X - 120) / 20);
    var startPos = 60;
    var height = 100;
    this.bricksTop = height - Game.ball.radius;
    this.bricksBottom = height + rows * 50 + (brickSize / 2);
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

  // Game.prototype.detectCollision = function() {
  //   var ball = Game.ball;
  //   var paddle = Game.paddle;
  //   if (ball.position[1] <= 55 + ball.radius) {
  //     ball.bounce('xAxis');
  //   } else if (
  //     ((ball.position[1] >= paddle.position[1]) && (ball.position[1] <= paddle.position[1] + 5)) &&
  //        (ball.position[0] > paddle.position[0] &&
  //         (ball.position[0] < paddle.position[0] + paddle.paddleSize))
  //     ) {
  //     ball.bounce('xAxis', ((ball.position[0] - paddle.position[0]) - (paddle.paddleSize / 2)));
  //   } else if (ball.position[0] <= 55) {
  //     ball.bounce('yAxis');
  //   } else if (ball.position[0] >= Game.DIM_X - 55) {
  //     ball.bounce('yAxis');
  //   }
  // };


  // If the ball is within the upper and lower bounds of the bricks
  // we will attempt to detect collisions
  // Game.prototype.startDetection = function() {
  //   var ballY = Game.ball.position[1];
  //   var bottom = this.bricksBottom, top = this.bricksTop;
  //   if (ballY < bottom && ballY > top) {
  //     this.detectBrickCollisions();
  //   }
  // };

  //
  // // Iterate through bricks and remove those the ball has collided with
  // Game.prototype.detectBrickCollisions = function() {
  //   var that = this;
  //   this.bricks.forEach(function(row){
  //     for(var i = 0; i < row.length; i++) {
  //
  //       var ballPath = Game.ball.futurePath();
  //       var intersections = [];
  //       row[i].segments.forEach(function(seg) {
  //         var result = that.lineIntersects(seg[0], seg[1], ballPath[0], ballPath[1]);
  //         if (result) {
  //           intersections.push([result, seg, row[i]]);
  //         }
  //       });
  //       var brick = row[i];
  //       if (intersections.length > 0) {
  //         var axis = intersections[0][1];
  //         var closest = 10;  //should be speed independent
  //         intersections.forEach(function(inter) {
  //           distance = that.distanceBetween(inter[0], Game.ball.position);
  //           if (distance < closest) {
  //             var axis = inter[1];
  //           }
  //         });
  //         // Bounce the ball of the axis of the closest intersection
  //         if (axis[0][0] === axis[1][0]) {
  //           Game.ball.bounce('xAxis', 0);
  //         } else {
  //           Game.ball.bounce('yAxis', 0);
  //         }
  //         row.splice(i, 1);
  //       }
  //       // Remove the brick
  //     }
  //       // var result = row[i].ballIntersects(Game.ball);
  //       //
  //       // if (result) {
  //       //
  //       //   if (result !== true) {
  //       //     debugger;
  //       //     Game.ball.bounce('xAxis', 0);
  //       //   }
  //       //
  //       //   row.splice(i, 1);
  //       // }
  //   });
  // };




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
    Game.ball.draw(ctx);
    Game.paddle.draw(ctx);

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
