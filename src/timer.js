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
    this.paused = true;
  }
  unpause(){
    this.paused = false;
  }

  start() {
    if (this.started === false) {
      this.started = true;
      this.currentTime = Date.now();
      this.game.init();
    }
    requestAnimationFrame(this.start.bind(this));
    let newTime = Date.now();
    let frameTime = newTime - this.currentTime;
    this.currentTime = newTime;
    while (frameTime > 0) {
      this.time.delta = Math.min(frameTime, this.timeStep);
      frameTime -= this.time.delta;
      this.time.runTime += this.time.delta;
      if (!this.paused) {
        this.game.update(this.time);
      }
    }
    this.time.ticks++;
    this.game.render();
  }
}