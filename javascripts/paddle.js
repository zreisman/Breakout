(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  Breakout.paddle = function (paddleStart) {
    this.paddleSize = 200;
    this.position = paddleStart;
    this.position[0] -= (this.paddleSize / 2); //Center the paddle

  };

  Breakout.paddle.prototype.move = function(newX) {
    this.lastPos = this.position[0];
    this.position[0] = newX - (this.paddleSize / 2);
  };

  Breakout.paddle.prototype.topEdge = function() {
    var tr = [this.position[0] + this.paddleSize, this.position[1]];
    return [this.position, tr];
  };

  Breakout.paddle.prototype.space = function() {
    var tr = [this.position[0] + this.paddleSize, this.position[1]];
    return [this.position, [tr[0], tr[1] - 20]];
  };

  Breakout.paddle.prototype.draw = function (ctx) {

    //draw this on the canvas
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(this.position[0], this.position[1], this.paddleSize, 20);
    ctx.closePath();
    ctx.lineWidth=1;
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  Breakout.paddle.prototype.velocity = function() {
    return this.position[0] - this.lastPos;
  };

})();
