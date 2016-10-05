import Graphics from './graphics';
import Character from './character';
import Timer from './timer';
import Map from './map';

const map01 = "1121111111111211111000110111211131123111111113111110011011111000011111111113331111110000000000000000000";

let Game = {
  init() {
    this.map = new Map(Assets.Tiles, map01);
    this.character = new Character(Assets.Tiles, this.map);
  },
  update(time) {
    this.map.update(time);
    this.character.update(time);
  },
  render() {
    Gamestate.ctx.fillStyle = '#b4a56a';
    Gamestate.ctx.fillRect(0, 0, Gamestate.ctx.canvas.width, Gamestate.ctx.canvas.height);
    this.map.render(Graphics, Gamestate.ctx);
    this.character.render(Graphics, Gamestate.ctx);
  }
}
let gameTimer = new Timer(Game, 1 / 60);

let Gamestate = {};
Gamestate.ctx = document.querySelector('canvas').getContext('2d');
let Assets = {};
Assets.Tiles = {};
Promise.all([
  Graphics.loadTileSet('i/ppl_rear_hair.png', 27, 27),
  Graphics.loadTileSet('i/ppl_body.png', 27, 27),
  Graphics.loadTileSet('i/ppl_face.png', 27, 27),
  Graphics.loadTileSet('i/ppl_front_hair.png', 27, 27),
  Graphics.loadTileSet('i/misc.png', 16, 16)
]).then(function(tilesets) {
  Assets.Tiles.rearHair = tilesets[0];
  Assets.Tiles.body = tilesets[1];
  Assets.Tiles.face = tilesets[2];
  Assets.Tiles.frontHair = tilesets[3];
  Assets.Tiles.mapTiles = tilesets[4];
  gameTimer.start();
});

window.addEventListener('keydown', function(e) {
  let key = e.key
  switch(key) {
  case 'w':
    Game.character.setNextPart('rearHair');
    break;
  case 'a':
    Game.character.setNextPart('body');
    break;
  case 's':
    Game.character.setNextPart('face');
    break;
  case 'd':
    Game.character.setNextPart('frontHair');
    break;
  case 'z':
    Game.character.jump();
    break;
  }
});



