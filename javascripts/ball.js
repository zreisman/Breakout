(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }


  var ball = Breakout.ball = function () {
    this.position = [200, 200];
    this.radius = 5;
    this.velocity = 5;
    this.trajectory = -45;
  };

  ball.prototype.bounce = function(axis, paddleVelocity) {
    if (axis === 'xAxis') {
      this.trajectory *= -1;
    } else if(axis === 'yAxis') {
      this.trajectory += 90;
    }
    if (paddleVelocity) {
      vector = this.modifyTrajectory(vector, paddleVelocity);
    }
  };


  // ball.prototype.modifyTrajectory = function(vector, speed) {
  //   if
  //   if (Math.abs(speed) > 10) {
  //     this.vector[0] - Math.floor(speed / 3);
  //   }
  //
  //   var newX = this.vector[0] - xMod;
  //   var newY = Math.sqrt(c - (newX * newX));
  //   this.vector = [newX, newY];
  // };

  ball.prototype.toRadians = function(angle) {
    return angle * (Math.PI / 180);
  };

  ball.prototype.move = function() {
    this.position[0] += Math.cos(this.toRadians(this.trajectory)) * this.velocity;
    this.position[1] += Math.sin(this.toRadians(this.trajectory)) * this.velocity;
  };

  Breakout.ball.prototype.draw = function (ctx) {

    //draw this on the canvas
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.position[0],this.position[1],this.radius,0,2*Math.PI);
    ctx.stroke();
  };

})();
