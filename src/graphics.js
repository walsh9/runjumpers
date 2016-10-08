const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .!?,\'":;_-+=/\\[]()#@%{}<>^*&~|→←↑↓○●$€¥'.split('');

export default class Graphics {
  constructor(ctx) {
    this.ctx = ctx;
  }

  setFont(font) {
    this.font = font;
  }

  clearScreen(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawTile(tileSet, tileX, tileY, x, y) {
    var tX = tileSet.tileWidth * tileX;
    var tY = tileSet.tileHeight * tileY;
    x = Math.floor(x);
    y = Math.floor(y);
    this.ctx.drawImage(tileSet.img,
      tX, tY, tileSet.tileWidth, tileSet.tileHeight,
      x,  y,  tileSet.tileWidth, tileSet.tileHeight);
  }

  drawGraphic(graphic, x, y) {
    this.drawTile(graphic, 0, 0, x, y);
  }

  draw(...params) {
    this.ctx.drawImage(...params);
  }

  drawText(text, x, y) {
    if (x === 'center') {
      x = Math.floor((this.ctx.canvas.width - text.length * (this.font.tileWidth + 1)) / 2);
    }
    let char, charIndex, charX, charY;
    for(let i = 0; i < text.length; i++) {
      char = text.charAt(i);
      charIndex = chars.indexOf(char);
      charX = x + i * (this.font.tileWidth + 1);
      charY = ['g', 'j', 'p', 'q', 'y'].indexOf(char) > -1 ? y + 2 : y;
      this.drawTile(this.font, charIndex, 0, charX, charY, this.ctx);
    }
  }
}
