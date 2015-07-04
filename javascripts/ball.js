(function () {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }


  var ball = Breakout.ball = function () {
    this.position = [150, 500];
    this.radius = 10;
    this.velocity = 10;
    this.trajectory = 270;  // 0 is East, -45 is Northeast
  };

  ball.prototype.bounce = function(axis, deflection) {
    this.bouncing = true;
    if (axis[0][1] === axis[1][1]) {
      this.trajectory *= -1;
    } else if(axis[0][0] === axis[1][0]) {
      this.trajectory = 90 + (90 - this.trajectory);
    }
    this.normalizeTrajectory();
    if (deflection) {
      this.trajectory = 270 + deflection / 2;
    }
  };

  ball.prototype.normalizeTrajectory = function() {
    this.trajectory = this.trajectory % 360;
  };

  ball.prototype.edgePaths = function() {

    var centerPath = this.futurePath();
    var start = centerPath[0];
    var end = centerPath[1];

    var angle1 = this.trajectory - 90;
    var angle2 = this.trajectory + 90;

    var path1 = [
      [
       start[0] + (this.radius * Math.cos(angle1)),
       start[1] + (this.radius * Math.sin(angle1))
      ],
      [
       end[0] + (this.radius * Math.cos(angle1)),
       end[1] + (this.radius * Math.sin(angle1))
      ]
    ];

    var path2 = [
      [
       start[0] + (this.radius * Math.cos(angle2)),
       start[1] + (this.radius * Math.sin(angle2))
      ],
      [
       end[0] + (this.radius * Math.cos(angle2)),
       end[1] + (this.radius * Math.sin(angle2))
      ]
    ];
    return [path1, path2];
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
    if (!this.bouncing) {
      var stepResult = this.step();
      var xMod = stepResult[0], yMod = stepResult[1];
      this.position[0] += xMod;
      this.position[1] += yMod;
    }
    this.bouncing = false;
  };

  Breakout.ball.prototype.draw = function (ctx) {

    //draw this on the canvas
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.position[0],this.position[1],this.radius,0,2*Math.PI);
    ctx.fill();
  };

})();
