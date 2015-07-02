(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  Brick = Breakout.Brick = function (size, position) {
    this.brickSize = [size, size/2];
    this.vertA = position;

    // Vertices are clockwise starting at top left.
    this.vertB = [this.vertA[0] + size, this.vertA[1]];
    this.vertC = [this.vertA[0] + size, this.vertA[1] + size/2];
    this.vertD = [this.vertA[0], this.vertA[1] + this.brickSize[1]];
    this.segments = [[this.vertA, this.vertB],
                    [this.vertB, this.vertC],
                    [this.vertC, this.vertD],
                    [this.vertD, this.vertA]
                    ];
  };


  // this function calculates the distance between two points in a graph;
  Brick.prototype.distanceBetween = function(A, B) {
    return Math.sqrt( Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  };


  // This logic may not be correct
  Brick.prototype.lineIntersectsCircle = function(circle, A, B) {
    var radius = circle.radius;
    var C = circle.position;
    if (this.distanceBetween(A, C) < radius ||
        this.distanceBetween(B, C) < radius) {

      return true;
    } else {
      return false;
    }
  };

  Brick.prototype.pointInside = function(point) {
     var A = this.vertA, C = this.vertC;
     if ((point[1] > A[1] && point[1] < C[1]) &&
         (point[0] > A[0] && point[0] < C[0])) {
        return true;
     } else {
       return false;
     }
  };

  Brick.prototype.ballIntersects = function(ball) {

    var that = this;
    this.segments.forEach(function(seg) {
      if (that.lineIntersectsCircle(ball, seg[0], seg[1])) {
        return seg;
      }
    });
    if (this.pointInside(ball.position)) {
      return true;
    }
    return false;
  };

  Brick.prototype.render = function(ctx) {
    //draw this on the canvas
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(this.vertA[0], this.vertA[1], this.brickSize[0], this.brickSize[1]);
    ctx.closePath();
    ctx.lineWidth=1;
    ctx.stroke();
    ctx.fill();
  };

})();
