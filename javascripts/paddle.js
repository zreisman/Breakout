(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  Breakout.paddle = function (paddleStart) {
    this.paddleSize = 200;
    this.position = paddleStart;
    this.position[0] -= (this.paddleSize / 2)
    this.velocity = 15;
  };

  Breakout.paddle.prototype.move = function(vector) {
    this.position[0] += vector[0] * this.velocity;
    this.position[1] += vector[1] * this.velocity;
  };

  Breakout.paddle.prototype.draw = function (ctx) {

    //draw this on the canvas
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(this.position[0], this.position[1], this.paddleSize, 20);
    ctx.closePath();
    ctx.fill();
  };

})();
