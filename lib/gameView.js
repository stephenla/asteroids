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

  GameView.prototype.startScreen = function () {
    this.ctx.clearRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
    this.ctx.fillStyle = Asteroids.Game.BG_COLOR;
    this.ctx.fillRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
    key("n", this.start.bind(this));
    this.drawStart(this.ctx);

  };

  GameView.prototype.start = function (event) {
    this.ctx.clearRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
    var gameView = this;
    // if (event.keyCode === 78) {
    gameView.game = new Asteroids.Game();
    // this.game.addShip();
    this.ship = gameView.game.addShip();
    gameView.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        if (gameView.game.ships.length === 0) {
          gameView.stop();
          gameView.drawStart(gameView.ctx);
          // gameView.drawEnd(gameView.ctx);
        }
      }, 500 / Asteroids.Game.FPS
    );
    gameView.bindKeyHandlers();

    // }
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };



  GameView.prototype.centerText = function (ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
        ctx.fillText(text, x, y);
    };

    // draw the main menu to the canvas
  GameView.prototype.drawEnd = function (ctx, elapsed) {

        // let's draw the text in the middle of the canvas
        // note that it's ineffecient to calculate this
        // in every frame since it never changes
        // however, I leave it here for simplicity
        var y = ctx.canvas.height / 2;

        // create a css color from the `hue`

        // clear the entire canvas
        // (this is not strictly necessary since we are always
        // updating the same pixels for this screen, however it
        // is generally what you need to do.)
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw the title of the game
        // this is static and doesn't change
        ctx.fillStyle = 'white';
        ctx.font = '48px monospace';
        this.centerText(ctx, 'A dangerous circle has killed you.', y);

        // draw instructions to the player
        // this animates the color based on the value of `hue`
        ctx.fillStyle = "blue";
        ctx.font = '34px monospace';
        this.centerText(ctx, "press 'n' to try again", y + 60);
    };
  GameView.prototype.drawStart = function (ctx, elapsed) {
        var y = ctx.canvas.height / 2;

        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '48px monospace';
        this.centerText(ctx, 'Dangerous Circles', y);

        ctx.fillStyle = "blue";
        ctx.font = '34px monospace';
        this.centerText(ctx, "press 'n' to play", y + 60);
  };

    // update the color we're drawing and
    // check for input from the user
    GameView.prototype.update = function () {
        // we want `hue` to oscillate between 0 and 255
        hue += 1 * direction;
        if (hue > 255) direction = -1;
        if (hue < 0) direction = 1;

        // note that this logic is dependent on the frame rate,
        // that means if the frame rate is slow then the animation
        // is slow.
        // we could make it indepedent on the frame rate, but we'll
        // come to that later.

        // here we magically capture the state of the mouse
        // notice that we are not dealing with events inside the game
        // loop.
        // we'll come back to this too.
        var isButtonDown = input.isButtonDown();

        // we want to know if the input (mouse click) _just_ happened
        // that means we only want to transition away from the menu to the
        // game if there _was_ input on the last frame _but none_ on the
        // current one.
        var mouseJustClicked = !isButtonDown && wasButtonDown;

        // we also check the value of `transitioning` so that we don't
        // initiate the transition logic more the once (like if the player
        // clicked the mouse repeatedly before we finished transitioning)
        if (mouseJustClicked && !transitioning) {
            transitioning = true;
            // do something here to transition to the actual game
        }

        // record the state of input for use in the next frame
        wasButtonDown = isButtonDown;
    };

    // this is the object that will be `startScreen`
    // return {
    //     draw: draw,
    //     update: update
    // };




})();
