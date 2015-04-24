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

  var Ship = Asteroids.Ship = function (options) {

    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || Ship.COLOR;
    this.loudResources();
    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 46;
  Ship.START_X = 600;
  Ship.START_Y = 650;
  Ship.COLOR = "black";


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);
    
    // if (norm == 0) {
    //   // Can't fire unless moving.
    //   return;
    // }

    // var relVel = Asteroids.Util.scale(
    //   Asteroids.Util.dir(this.vel),
    //   Asteroids.Bullet.SPEED
    // );
    debugger

    var bulletVel = [
      0, -15
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: Asteroids.Bullet.COLOR,
      game: this.game
    });

    this.game.add(bullet);
  };

  Ship.prototype.power = function (impulse) {

    // this.vel[0] += impulse[0];
    //left
    if (impulse[0] === 0) {
      // this.pos[0] += impulse[0];
      this.vel = impulse;
    } else {
      this.vel = [impulse[0],0];
    }
    // right
    // if (impulse[0] > 0) {
    //   this.vel = [impulse[0],0];
    //    this.pos[0] += impulse[0];
    // }

    // this.vel[1] += impulse[1];

  };

  Ship.prototype.decelerate = function (event) {

    event.preventDefault();
    //left or 'a'
    if (event.keyCode === 65 || event.keyCode === 37) {
      this.vel = [0, 0];
    }
    //right or 'd'
    if (event.keyCode === 91 || event.keyCode === 39) {
      this.vel = [0, 0];
    }
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.move = function () {

    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.radius, this.radius);
    ctx.drawImage(this.shipImage, 25, 1, 23, 23, this.pos[0], this.pos[1], this.radius, this.radius);
  };

  Ship.prototype.loudResources = function () {
    this.shipImage = new Image();
    this.shipImage.src = "images/ship.png";
  };


})();
