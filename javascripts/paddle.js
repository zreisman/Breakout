(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  Breakout.paddle = function (paddleStart) {
    this.paddleSize = 200;
    this.position = paddleStart;
    this.position[0] -= (this.paddleSize / 2);
  };

  Breakout.paddle.prototype.move = function(newX) {
    this.lastPos = this.position[0];
    this.position[0] = newX - (this.paddleSize / 2);
  };

  Breakout.paddle.prototype.draw = function (ctx) {

    //draw this on the canvas
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(this.position[0], this.position[1], this.paddleSize, 20);
    ctx.closePath();
    ctx.fill();
  };

  Breakout.paddle.prototype.velocity = function() {
    return this.position[0] - this.lastPos;
  };

})();
