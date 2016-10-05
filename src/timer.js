export default class Timer {
  constructor(game, timeStep) {
    this.runTime = 0;
    this.ticks = 0;
    this.started = false;
    this.timeStep = timeStep;
    this.game = game;
  }

  start() {
    if (this.started === false) {
      this.started = true;
      this.currentTime = Date.now()
      this.game.init();
    }
    requestAnimationFrame(this.start.bind(this));
    let newTime = Date.now();
    let frameTime = newTime - this.currentTime;
    this.currentTime = newTime;
    while (frameTime > 0) {
      var delta = Math.min(frameTime, this.timeStep);
      frameTime -= delta;
      this.runTime += delta;
      this.game.update({delta, ticks: this.ticks, runTime: this.runTime});
    }
    this.ticks++;
    this.game.render();
  }
}