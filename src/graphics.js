let Graphics = {}

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

Graphics.drawTile = function(tileSet, tileX, tileY, x, y, ctx) {
  var tX = Math.floor(tileSet.tileWidth * tileX);
  var tY = Math.floor(tileSet.tileHeight * tileY);
  ctx.drawImage(tileSet.img,
    tX, tY, tileSet.tileWidth, tileSet.tileHeight,
    x,  y,  tileSet.tileWidth, tileSet.tileHeight);
}

export default Graphics;
