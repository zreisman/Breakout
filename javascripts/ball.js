(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }


  var ball = Breakout.ball = function () {
    this.position = [200, 500];
    this.radius = 10;
    this.velocity = 5;
    this.trajectory = -45;
  };

  ball.prototype.bounce = function(axis, deflection) {
    if (axis === 'xAxis') {
      this.trajectory *= -1;
    } else if(axis === 'yAxis') {
      this.trajectory = 90 + (90 - this.trajectory);
    }
    this.normalizeTrajectory();
    if (deflection && this.trajectory >= 225 && this.trajectory <= 315) {
      deflection_value = Math.floor(deflection / 3);
      console.log('deflecting' + deflection_value);
      this.trajectory += deflection_value;
    }
      console.log(this.trajectory);
  };

  ball.prototype.normalizeTrajectory = function() {
    if (this.trajectory > 360) {
      this.trajectory -= 360;
    } else if (this.trajectory < 1) {
      this.trajectory += 360;
    }
  };

  ball.prototype.futurePath = function() {
    var stepResult = this.step();
    var xMod = stepResult[0], yMod = stepResult[1];
    return [[this.position[0], this.position[1]], [this.position[0] + xMod, this.position[1] + yMod]];
  };

  ball.prototype.step = function() {
    var xMod = Math.cos(this.toRadians(this.trajectory)) * this.velocity;
    var yMod = Math.sin(this.toRadians(this.trajectory)) * this.velocity;
    return [xMod, yMod];
  };


  ball.prototype.toRadians = function(angle) {
    return angle * (Math.PI / 180);
  };

  ball.prototype.move = function() {
    var stepResult = this.step();
    var xMod = stepResult[0], yMod = stepResult[1];
    this.position[0] += xMod;
    this.position[1] += yMod;
  };

  Breakout.ball.prototype.draw = function (ctx) {

    //draw this on the canvas
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.position[0],this.position[1],this.radius,0,2*Math.PI);
    ctx.fill();
  };

})();
