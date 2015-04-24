(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };
  GameView.SPEED = 10;
  GameView.MOVES = {
    "a": [-GameView.SPEED,  0],
    "left": [-GameView.SPEED,  0],
    "d": [ GameView.SPEED,  0],
    "right": [ GameView.SPEED,  0],
    "s": [ 0,  0],
    "down": [ 0,  0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet(); });
    key("w", function () { ship.fireBullet(); });
    key("up", function () { ship.fireBullet(); });
    // key.addEvent(document, 'keyup', ship.decelerate);
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 500 / Asteroids.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
