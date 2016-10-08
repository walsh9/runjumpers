import fromHash from 'promise-from-hash';

export default class Loader {
  constructor() {
    this.tilesets = {};
    this.graphics = {};
  }
  addGraphic(name, imageSource) {
    this.graphics[name] = {imageSource};
  }
  addTileSet(name, imageSource, tileWidth, tileHeight) {
    this.tilesets[name] = {imageSource, tileWidth, tileHeight};
  }
  load() {
    return fromHash({
      tiles: fromHash(Object.keys(this.tilesets).reduce((accumulator, currentKey) => {
        accumulator[currentKey] = this._loadTileSet(this.tilesets[currentKey]);
        return accumulator;
      }, {})),
      graphics: fromHash(Object.keys(this.graphics).reduce((accumulator, currentKey) => {
        accumulator[currentKey] = this._loadGraphic(this.graphics[currentKey]);
        return accumulator;
      }, {}))
    });
  }
  _loadTileSet({imageSource, tileWidth, tileHeight}) {
    return this._loadImage(imageSource, tileWidth, tileHeight);
  }
  _loadGraphic({imageSource}) {
    return this._loadImage(imageSource);
  }
  _loadImage(imageSource, tileWidth, tileHeight) {
    return new Promise(function(resolve) {
      let imageElement = document.createElement('img');
      imageElement.onload = function(event) {
        let image = event.target;
        let canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        let imageData = ctx.getImageData(0, 0, width, height);
        imageData.img = image;
        tileWidth = tileWidth || width;
        tileHeight = tileHeight || height;
        imageData.tileWidth = tileWidth;
        imageData.tileHeight = tileHeight;
        imageData.tileColumns = Math.floor(width / tileWidth);
        imageData.tileRows = Math.floor(height / tileHeight);
        resolve(imageData);
      };
      imageElement.src = imageSource;
    });
  }
}