export default class Timer {
  constructor(game, timeStep) {
    this.time = {};
    this.time.runTime = 0;
    this.time.ticks = 0;
    this.time.delta = 0;
    this.started = false;
    this.timeStep = timeStep;
    this.paused = false;
    this.game = game;
  }

  pause() {
    if (this.paused === false) {
      this.paused = true;
    }
  }
  unpause(){
    if (this.paused === true) {
      this.currentTime = Date.now();
      this.paused = false;
      this.start();
    }
  }

  start() {
    if (this.started === false) {
      this.started = true;
      this.currentTime = Date.now();
      this.game.init();
    }
    if (this.paused === false) {
      requestAnimationFrame(this.start.bind(this));
    }
    let newTime = Date.now();
    let frameTime = newTime - this.currentTime;
    this.currentTime = newTime;
    while (frameTime > 0) {
      this.time.delta = Math.min(frameTime, this.timeStep);
      frameTime -= this.time.delta;
      this.time.runTime += this.time.delta;
      this.game.update(this.time);
    }
    this.time.ticks++;
    this.game.render();
  }
}