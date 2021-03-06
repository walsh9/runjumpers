import { near, mod } from './utils';
import sounds from './sounds';

export default class Character {
  constructor(charParams, map) {
    this.tiles = charParams.tiles;
    this.runSpeed = charParams.runSpeed;
    this.sound = charParams.sound;
    this.map = map;
    this.parts = {};
    this.randomizeParts();
    this.pos = {x: 30, y: 55};
    this.velocity = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0.0005};
    this.state = 'standing';
    this.runFrame = 1;
  }

  update(time, screen) {
    this.pos.x += time.delta * this.runSpeed;
    let footPos = this.state === 'running' ? 10 : 18;
    let floorHeight = 117 - this.map.heightHere(this.pos.x + footPos);
    if (!near(this.pos.y, floorHeight, 0.1) || this.velocity.y < 0 ) {
      if (this.velocity.y <= 0) {
        this.state = 'jumping';
      } else {
        this.state = 'falling';
      }
      this.velocity.y += time.delta * this.acceleration.y;
      if (near(this.velocity.y, 0, 0.0000001)) {
        this.velocity.y = 0;
      }
      this.pos.y      += time.delta * this.velocity.y;
    } else {
      this.state = 'running';
      this.velocity.y = 0;
      this.pos.y      = floorHeight;
    }
    this.runFrame = (time.ticks % 6) < 3 ? 1 : 2;
    if (this.pos.y > 200) {
      screen.fall();
    }
  }

  render(graphics) {
    let animFrame = 0;
    if (this.state === 'running') {
      animFrame = this.runFrame;
    } else if (this.state === 'jumping') {
      animFrame = 3;
    } else if (this.state === 'falling') {
      animFrame = 0;
    }
    graphics.drawTile(this.tiles.rearHair, this.parts.rearHair, 0, this.pos.x, this.pos.y);
    graphics.drawTile(this.tiles.body, this.parts.body, animFrame, this.pos.x, this.pos.y);
    graphics.drawTile(this.tiles.face, this.parts.face, 0, this.pos.x, this.pos.y);
    graphics.drawTile(this.tiles.frontHair, this.parts.frontHair, 0, this.pos.x, this.pos.y);
  }

  jump() {
    if (this.state === 'running') {
      this.sound.beep(...sounds.jump);
      this.velocity.y = -0.24;
    }
  }

  hop() {
    if (this.state === 'running') {
      this.sound.beep(...sounds.hop);
      this.velocity.y = -0.135;
    }
  }

  randomizeParts() {
    this.setRandomPart('rearHair');
    this.setRandomPart('face');
    this.setRandomPart('body');
    this.setRandomPart('frontHair');
  }

  setRandomPart(partName) {
    this.parts[partName] = Math.floor((Math.random() * this.tiles[partName].tileColumns));
  }

  setNextPart(partName) {
    this.parts[partName] = mod(this.parts[partName] + 1, this.tiles[partName].tileColumns);
  }

  setPrevPart(partName) {
    this.parts[partName] = mod(this.parts[partName] - 1, this.tiles[partName].tileColumns);
  }

}