(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.boundaries = [];

    this.addAsteroids();
    this.addBoundaries();
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1200;
  Game.DIM_Y = 720;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 1;
  Game.HORIZONTAL_BOUNDARY = 600;

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.HorizontalBoundary) {
      this.boundaries.push(object);
    } else if (object instanceof Asteroids.VerticalBoundary) {
      this.boundaries.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.reset = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.boundaries = [];

    this.addAsteroids();
    this.addBoundaries();
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this, pos: [300, 300] }));
    }
  };

  Game.prototype.addBoundaries = function () {
    this.add(new Asteroids.HorizontalBoundary(Game.HORIZONTAL_BOUNDARY));
    this.add(new Asteroids.HorizontalBoundary(0));
    this.add(new Asteroids.VerticalBoundary(0 + 1));
    this.add(new Asteroids.VerticalBoundary(Game.DIM_X - 1));
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: [Asteroids.Ship.START_X, Asteroids.Ship.START_Y],
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.ships)
      .concat(this.asteroids)
      .concat(this.bullets)
      .concat(this.boundaries);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      if (obj1 instanceof Asteroids.HorizontalBoundary || obj1 instanceof Asteroids.VerticalBoundary) return;
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      // if (object instanceof Asteroids.HorizontalBoundary) {debugger;}
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      if (object instanceof Asteroids.HorizontalBoundary || object instanceof Asteroids.VerticalBoundary) { return; }
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      //when bullet hits asteroid
      var idx = this.asteroids.indexOf(object);
      this.asteroids.splice(idx, 1);
      // this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);

    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap (coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();
