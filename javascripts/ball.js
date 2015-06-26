(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var ball = Breakout.ball = function () {
    this.position = [200, 200];
    this.radius = 5;
    this.velocity = 5;
    this.vector = [1, -1];
  };

  ball.prototype.move = function() {
    this.position[0] += this.vector[0] * this.velocity;
    this.position[1] += this.vector[1] * this.velocity;
  };

  Breakout.ball.prototype.draw = function (ctx) {

    //draw this on the canvas
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.position[0],this.position[1],this.radius,0,2*Math.PI);
    ctx.stroke();
  };

})();
