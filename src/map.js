import { randomInt, randomBetween, shuffle } from './utils';
import sounds from './sounds';
const Y_FROM_FLOOR = [128, 112, 96, 80, 64, 48, 32, 16, 0];
const GROUND = 0;
const COLUMN_ROOT = 1;
const COLUMN_MID = 2;
const COLUMN_TOP = 3;
const CLOUD_RIGHT = 8;
const CLOUD_LEFT = 7;
const PLATFORM = 9;
const GLOW_PILLAR_1 = 12;
const GLOW_PILLAR_2 = 13;
const GLOW_COLUMN_1 = 14;
const GLOW_COLUMN_2 = 15;
const HEIGHTS = [-100, 13, 29, 45, 61, 77, 93, 13, 29, 13];

export default class Map {
  constructor(params) {
    this.tiles = params.assets.tiles;
    this.graphics = params.assets.graphics;
    this.sound = params.sound;
    this.stage = params.map.data.split('');
    this.messages = params.map.messages || [];
    this.stageWidth = this.stage.length  * this.tiles.mapTiles.tileWidth;
    this.scrollSpeed = params.scrollSpeed;
    this.bg = params.bg;
    this.x = 0;
    this.glow = 0;
    if (this.bg) {
      let bgSlices = shuffle([1,2,3,4,5,6,7,8,9,10]);
      this.bg1 = this.createBg('Dark', 15, 0.4, bgSlices.slice(0,5));
      this.bg2 = this.createBg('Light', 20, 0.3, bgSlices.slice(5));
    }
  }
  update(time, screen) {
    this.x += time.delta * this.scrollSpeed;
    this.glow = time.ticks % 2;
    let here = Math.floor((-this.x + 36) / this.tiles.mapTiles.tileWidth);
    if (this.stage[here] === '9') {
      screen.winLevel();
    }
  }
  heightHere(offset) {
    let index = Math.floor((-this.x + offset) / this.tiles.mapTiles.tileWidth);
    let tile = this.stage[index];
    return HEIGHTS[tile];
  }
  render(graphics) {
    let leftmostTile = Math.floor((-this.x) / this.tiles.mapTiles.tileWidth);
    let rightmostTile = leftmostTile + 10;

    if (this.bg) {
      graphics.draw(this.bg2.canvas, Math.floor(this.x * this.bg2.parallaxFactor), 0);
      graphics.draw(this.bg1.canvas, Math.floor(this.x * this.bg1.parallaxFactor), 0);
    }

    let here = Math.floor((-this.x + 11) / this.tiles.mapTiles.tileWidth);
    for(let i = 0; i < this.messages.length; i++) {
      let message = this.messages[i];
      if (message.start < here && message.end > here) {
        graphics.drawText(message.text, 'center', 10);
      }
    }

    this.stage.forEach((t, index) => {
      if (index < leftmostTile || index > rightmostTile) {
        return;
      }
      let x = this.x + this.tiles.mapTiles.tileWidth * index;
      switch(t) {
      case '0':
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
        graphics.drawTile(this.tiles.mapTiles, PLATFORM, 0, x, Y_FROM_FLOOR[t - 1]);
        break;
      case '7':
        graphics.drawTile(this.tiles.mapTiles, COLUMN_TOP, 0, x, Y_FROM_FLOOR[0]);
        break;
      case '8':
        graphics.drawTile(this.tiles.mapTiles, COLUMN_TOP, 0, x, Y_FROM_FLOOR[1]);
        graphics.drawTile(this.tiles.mapTiles, COLUMN_MID, 0, x, Y_FROM_FLOOR[0]);
        break;
      case '9':
        for (let i = 1; i < 9; i++) {
          graphics.drawTile(this.tiles.mapTiles, GLOW_PILLAR_1 + this.glow, 0, x, Y_FROM_FLOOR[i]);
        }
        graphics.drawTile(this.tiles.mapTiles, GLOW_COLUMN_1 + this.glow, 0, x, Y_FROM_FLOOR[0]);
        break;
      }
    });
  }

  createBg(variant, spacing, parallaxFactor, availableSlices) {
    let minWidth = Math.floor((this.stageWidth + 320) * parallaxFactor);
    let w = 0;
    let possibleSlices = [];
    let slices = [];
    while (w < minWidth) {
      if (possibleSlices.length === 0) {
        possibleSlices = shuffle(availableSlices.slice());
      }
      let sliceId = possibleSlices.pop();
      let slice = this.graphics[`bg${variant}${sliceId}`];
      slices.push(slice);
      w += slice.width + spacing;
    }

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = 144;
    let x = 0;
    slices.forEach(slice => {
      let y = randomInt(0, 2);
      ctx.drawImage(slice.img, x, y * 12);
      x += slice.width + spacing;
    });
    return {canvas, parallaxFactor};
  }


}