import { randomBetween } from './utils';
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
  constructor(tiles, mapstring) {
    this.tiles = tiles;
    this.stage = mapstring.split('');
    this.x = 0;
    this.clouds = [];
    for (let c = 0; c < 20; c++) {
      this.clouds.push(this._randomCloud());
    }
  }
  _randomCloud() {
    return {x: randomBetween(-6, 160), y: randomBetween(0, 120), speed: randomBetween(0.05, 0.2)};
  }
  _updateCloud(cloud, time) {
    if (cloud.x > -40) {
      cloud.x -= time.delta * cloud.speed;
    } else {
      cloud.x = 160;
      cloud.y = randomBetween(0, 120);
      cloud.speed = randomBetween(0.05, 0.2);
    }
  }
  update(time, delta, ticks) {
    this.x -= time.delta * 0.1;
    for(let i = 0; i < this.clouds.length; i++) {
      this._updateCloud(this.clouds[i], time);
    }
  }
  heightHere(offset) {
    let index = Math.floor((-this.x + offset) / this.tiles.mapTiles.tileWidth);
    let tile = this.stage[index];
    return HEIGHTS[tile];
  }
  render(graphics, ctx) {
    let leftmostTile = Math.floor((-this.x) / this.tiles.mapTiles.tileWidth);
    let rightmostTile = leftmostTile + 10;

    let cloud;
    for(let i = 0; i < this.clouds.length; i++) {
      cloud = this.clouds[i];
      graphics.drawTile(this.tiles.mapTiles, CLOUD_LEFT, 0, cloud.x, cloud.y, ctx);
      graphics.drawTile(this.tiles.mapTiles, CLOUD_RIGHT, 0, cloud.x + 16, cloud.y, ctx);
    };

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
        graphics.drawTile(this.tiles.mapTiles, PLATFORM, 0, x, Y_FROM_FLOOR[t - 1], ctx);
        break;
      }
    });
  }
}