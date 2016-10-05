import { near } from './utils';

export default class Character {
  constructor(tiles, map) {
    this.tiles = tiles;
    this.map = map;
    this.parts = {};
    this.setRandomPart('rearHair');
    this.setRandomPart('face');
    this.setRandomPart('body');
    this.setRandomPart('frontHair');
    this.pos = {x: 30, y: 50};
    this.velocity = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0.0005};
    this.state = 'standing';
    this.runFrame = 1;
  }

  update(time) {
    let footPos = this.state === 'running' ? 11 : 18;
    let floorHeight = 117 - this.map.whatsHere(this.pos.x + footPos).height;
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
  }

  render(graphics, ctx) {
    let animFrame = 0;
    if (this.state === 'running') {
      animFrame = this.runFrame;
    } else if (this.state === 'jumping') {
      animFrame = 3;
    } else if (this.state === 'falling') {
      animFrame = 0;
    }
    graphics.drawTile(this.tiles.rearHair, this.parts.rearHair, 0, this.pos.x, this.pos.y, ctx);
    graphics.drawTile(this.tiles.body, this.parts.body, animFrame, this.pos.x, this.pos.y, ctx);
    graphics.drawTile(this.tiles.face, this.parts.face, 0, this.pos.x, this.pos.y, ctx);
    graphics.drawTile(this.tiles.frontHair, this.parts.frontHair, 0, this.pos.x, this.pos.y, ctx);
  }

  _checkCollision() {

  }

  jump() {
    console.log(this.pos, this.velocity);
    if (this.velocity.y === 0) {
      this.velocity.y = -0.24;
    }
  }

  setRandomPart(partName) {
    this.parts[partName] = Math.floor((Math.random() * this.tiles[partName].tileColumns));
  }

  setNextPart(partName) {
    this.parts[partName] = (this.parts[partName] + 1) % this.tiles[partName].tileColumns;
  }
}