(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  function randomColor () {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.round((Math.random() * 16))];
    }

    return color;
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = options.color || randomColor();
    options.pos = options.pos || options.game.randomPosition();
    options.radius = options.radius || Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
    this.timer = window.setInterval(function () {
      this.fireBullet();
    }.bind(this), 2000);
  };

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 200;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.isCollidedWith = function (otherObject) {
    if (otherObject instanceof Asteroids.HorizontalBoundary) {
      var da = Math.abs(otherObject.pos[1] - this.pos[1]);
      return da < this.radius;
    } else if (otherObject instanceof Asteroids.VerticalBoundary) {
      var db = Math.abs(otherObject.pos[0] - this.pos[0]);
      return db < this.radius;
    } else {
      var centerDist = Asteroids.Util.dist(this.pos, otherObject.pos);
      return centerDist < (this.radius + otherObject.radius);
    }
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      // otherObject.relocate();
    }
    if (otherObject instanceof Asteroids.HorizontalBoundary) {
      this.bounceVertical();
    }
    if (otherObject instanceof Asteroids.VerticalBoundary) {
      this.bounceHorizontal();
    }
  };

  Asteroid.prototype.remove = function () {
    var chance = Math.random();
    var vel = [-this.vel[0], -this.vel[1]];
    if (this.radius < 20) {
      this.game.remove(this);
      window.clearInterval(this.timer);
      return;
    }
    if (chance < 0.50) {
      vel = Asteroids.Util.randomVec(Math.floor((Math.random() * 100) % 4) + 5);
      this.radius = this.radius / 1.3;
    } else {
      this.radius = this.radius / 1.5;
    }
    var newPos = [];
    if (this.vel[0] < 0) {
      newPos = [this.pos[0] + this.radius, this.pos[1]];
    } else {
      newPos = [this.pos[0] - this.radius, this.pos[1]];
    }

    this.game.add(new Asteroids.Asteroid({ game: this.game, pos: newPos, color: randomColor(),
      vel: vel, radius: this.radius }));
    // this.game.remove(this);
  };

  Asteroid.prototype.bounceVertical = function (otherObject) {
    this.vel[1] = -(this.vel[1]);

  };
  Asteroid.prototype.bounceHorizontal = function (otherObject) {
    this.vel[0] = -(this.vel[0]);

  };
  Asteroid.prototype.fireBullet = function () {

    var bulletVel = [
      0, 7
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: "red",
      game: this.game,
      asteroid: true,
      radius: 4
    });

    this.game.add(bullet);
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

})();
