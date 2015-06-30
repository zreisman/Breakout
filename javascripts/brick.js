(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  Brick = Breakout.Brick = function (size, position) {
    this.brickSize = [size, size/2];
    this.verticeA = position;
    this.verticeB = [this.verticeA[0] + size[0], this.verticeA[1]];
    this.verticeC = [this.verticeB[0], this.verticeB[1] + size[1]];
    this.verticeD = [this.verticeA[0], this.verticeA[1] + size[1]];
  };

  Brick.prototype.render = function(ctx) {
    //draw this on the canvas
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(this.verticeA[0], this.verticeA[1], this.brickSize[0], this.brickSize[1]);
    ctx.closePath();
    ctx.lineWidth=1;
    ctx.stroke();
    // ctx.fill();
  };

})();
