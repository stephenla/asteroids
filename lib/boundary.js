(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var HorizontalBoundary = Asteroids.HorizontalBoundary = function (pos) {
    this.color = HorizontalBoundary.COLOR;
    this.pos = [0, pos];
  };

  HorizontalBoundary.COLOR = "yellow";

  HorizontalBoundary.prototype.draw = function (ctx) {

    ctx.beginPath();
         ctx.moveTo(this.pos[0], this.pos[1]);
         ctx.lineTo(Asteroids.Game.DIM_X, this.pos[1]);
    ctx.strokeStyle = this.color;
         ctx.stroke();
  };
  HorizontalBoundary.prototype.isCollidedWith = function (otherObject) {
    // var centerDist = Math.abs(this.pos[1] - otherObject.pos[1]);
    // return centerDist < otherObject.radius;
    // do nothing
  };

  HorizontalBoundary.prototype.collideWith = function (otherObject) {
    //do nothing
  };

})();
