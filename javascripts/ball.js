(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }


  var ball = Breakout.ball = function () {
    this.position = [200, 200];
    this.radius = 5;
    this.velocity = 10;
    this.trajectory = -45;
  };

  ball.prototype.bounce = function(axis, deflection) {
    console.log("deflection is " + deflection);
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
