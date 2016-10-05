export default class Map {
  constructor(tiles, mapstring) {
    this.tiles = tiles;
    this.stage = mapstring.split('');
    this.x = 0;
  }
  update(time) {
    this.x -= time.delta * 0.1;
  }
  whatsHere(offset) {
    let heights = [-100, 10, 29, 45];
    let index = Math.floor((-this.x + offset) / this.tiles.mapTiles.tileWidth);
    let tile = this.stage[index];
    return {height: heights[tile]};
  }
  render(graphics, ctx) {
    const y = [128, 112, 96, 80, 68];
    const GROUND = 0;
    const COLUMN_ROOT = 1;
    const COLUMN_MID = 2;
    const COLUMN_TOP = 3;
    this.stage.forEach((t, index) => {
      let x = this.x + this.tiles.mapTiles.tileWidth * index;
      switch(t) {
      case '0':
        break;
      case '1':
        graphics.drawTile(this.tiles.mapTiles, GROUND, 0, x, y[0], ctx);
        break;
      case '2':
        graphics.drawTile(this.tiles.mapTiles, COLUMN_ROOT, 0, x, y[0], ctx);
        graphics.drawTile(this.tiles.mapTiles, COLUMN_TOP, 0, x, y[1], ctx);
        break;
      case '3':
        graphics.drawTile(this.tiles.mapTiles, COLUMN_ROOT, 0, x, y[0], ctx);
        graphics.drawTile(this.tiles.mapTiles, COLUMN_MID, 0, x, y[1], ctx);
        graphics.drawTile(this.tiles.mapTiles, COLUMN_TOP, 0, x, y[2], ctx);
        break;
      }
    });
  }
}