let Graphics = {};

Graphics.loadTileSet = function(imageSource, tileWidth, tileHeight) {
  return new Promise(function(resolve) {
    var imageElement = document.createElement('img');
    imageElement.onload = function(event) {
      var image = event.target;
      var canvas = document.createElement('canvas');
      var width = image.width;
      var height = image.height;
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      var imageData = ctx.getImageData(0, 0, width, height);
      imageData.img = image;
      imageData.tileWidth = tileWidth;
      imageData.tileHeight = tileHeight;
      imageData.tileColumns = Math.floor(width / tileWidth);
      imageData.tileRows = Math.floor(height / tileHeight);
      resolve(imageData);
    };
    imageElement.src = imageSource;
  });
};

Graphics.clearScreen = function(ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

Graphics.drawTile = function(tileSet, tileX, tileY, x, y, ctx) {
  var tX = tileSet.tileWidth * tileX;
  var tY = tileSet.tileHeight * tileY;
  x = Math.floor(x);
  y = Math.floor(y);
  ctx.drawImage(tileSet.img,
    tX, tY, tileSet.tileWidth, tileSet.tileHeight,
    x,  y,  tileSet.tileWidth, tileSet.tileHeight);
};

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .!?,\'":;_-+=/\\[]()#@%{}<>^*&~|→←↑↓○●$€¥'.split('');
Graphics.drawText = function(tileSet, text, x, y, ctx) {
  if (x === 'center') {
    x = Math.floor((ctx.canvas.width - text.length * (tileSet.tileWidth + 1)) / 2);
  }
  let char, charIndex, charX, charY;
  for(let i = 0; i < text.length; i++) {
    char = text.charAt(i);
    charIndex = chars.indexOf(char);
    charX = x + i * (tileSet.tileWidth + 1);
    charY = ['g', 'j', 'p', 'q', 'y'].indexOf(char) > -1 ? y + 2 : y;
    this.drawTile(tileSet, charIndex, 0, charX, charY, ctx);
  };
};

export default Graphics;
