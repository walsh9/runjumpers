var BeepMaker = function () {
  var audioContext = window.AudioContext || window.webkitAudioContext;
  this.context = new audioContext();
  this.muted = false;

  this.freqMutator = 1;
  this.freq2Mutator = 1;
  this.timeMutator = 1;
};

BeepMaker.prototype.beep = function(frequency, frequency2, type, durationSeconds, volume) {
  if (this.muted) {
    return;
  }
  var ctx = this.context;
  var osc = ctx.createOscillator();
  var gainOsc = ctx.createGain();

  var vol = volume || 0.5;
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(frequency2, ctx.currentTime + durationSeconds * 0.9);
  osc.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + durationSeconds);

  gainOsc.gain.setValueAtTime(vol, ctx.currentTime);
  gainOsc.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSeconds);

  osc.connect(gainOsc);
  gainOsc.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + durationSeconds);
};

export default BeepMaker;