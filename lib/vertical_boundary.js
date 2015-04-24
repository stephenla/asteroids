(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var VerticalBoundary = Asteroids.VerticalBoundary = function (pos) {
    this.color = VerticalBoundary.COLOR;
    this.pos = [pos, 0];
  };

  VerticalBoundary.COLOR = "yellow";

  VerticalBoundary.prototype.draw = function (ctx) {

    ctx.beginPath();
     ctx.moveTo(this.pos[0], this.pos[1]);
     ctx.lineTo(this.pos[0], Asteroids.Game.HORIZONTAL_BOUNDARY);
     ctx.strokeStyle = this.color;
     ctx.stroke();
  };
  VerticalBoundary.prototype.isCollidedWith = function (otherObject) {
    // var centerDist = Math.abs(this.pos[0] - otherObject.pos[0]);
    // return centerDist < otherObject.radius;
    // do nothing
  };

  VerticalBoundary.prototype.collideWith = function (otherObject) {
    //do nothing
  };

})();
