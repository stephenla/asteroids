(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.color = options.color || Bullet.COLOR;
    this.asteroid = options.asteroid || false;
    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;
  Bullet.COLOR = "yellow";

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid && this.asteroid === false) {
      this.remove();
      otherObject.remove();
    }
    if (otherObject instanceof Asteroids.Ship && this.asteroid === true) {
      this.remove();
      otherObject.remove();
    }
  };

  Bullet.prototype.isWrappable = false;
})();
