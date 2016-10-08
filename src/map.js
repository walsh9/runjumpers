import { randomInt, randomBetween, shuffle } from './utils';
const Y_FROM_FLOOR = [128, 112, 96, 80, 68];
const GROUND = 0;
const COLUMN_ROOT = 1;
const COLUMN_MID = 2;
const COLUMN_TOP = 3;
const CLOUD_RIGHT = 8;
const CLOUD_LEFT = 7;
const PLATFORM = 9;
const HEIGHTS = [-100, 13, 29, 45, 61];

export default class Map {
  constructor(params) {
    this.tiles = params.assets.tiles;
    this.graphics = params.assets.graphics;
    this.stage = params.mapstring.split('');
    this.stageWidth = this.stage.length  * this.tiles.mapTiles.tileWidth;
    this.scrollSpeed = params.scrollSpeed;
    this.bg = params.bg;
    this.x = 0;
    this.clouds = [];
    if (this.bg) {
      let bgSlices = shuffle([1,2,3,4,5,6,7,8,9,10]);
      this.bg1 = this.createBg('Dark', 15, 0.4, bgSlices.slice(0,5));
      this.bg2 = this.createBg('Light', 20, 0.3, bgSlices.slice(5));
    }
  }
  update(time, delta, ticks) {
    this.x += time.delta * this.scrollSpeed;

    for(let i = 0; i < this.clouds.length; i++) {
      this._updateCloud(this.clouds[i], time);
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
      graphics.draw(this.bg2.canvas, this.x * this.bg2.parallaxFactor, 0);
      graphics.draw(this.bg1.canvas, this.x * this.bg1.parallaxFactor, 0);
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
        graphics.drawTile(this.tiles.mapTiles, PLATFORM, 0, x, Y_FROM_FLOOR[t - 1]);
        break;
      }
    });
  }
  createBg(variant, spacing, parallaxFactor, availableSlices) {
    let minWidth = Math.floor(this.stageWidth * parallaxFactor);
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