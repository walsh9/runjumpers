import Graphics from './graphics';
import Character from './character';
import Timer from './timer';
import Map from './map';
import TitleScreen from './screens/title';

window.Game = {
  init() {
    this.currentScreen = new TitleScreen(this);
  },
  update(time) {
    this.currentScreen.update(time);
  },
  render() {
    this.currentScreen.render(Graphics, Gamestate.ctx);
  }
};
let gameTimer = new Timer(Game, 1 / 60);

let Gamestate = {};
Gamestate.ctx = document.querySelector('canvas').getContext('2d');
let Assets = {};
Assets.tiles = {};
Assets.panels = {};
Promise.all([
  Graphics.loadTileSet('i/ppl_rear_hair.png', 27, 27),
  Graphics.loadTileSet('i/ppl_body.png', 27, 27),
  Graphics.loadTileSet('i/ppl_face.png', 27, 27),
  Graphics.loadTileSet('i/ppl_front_hair.png', 27, 27),
  Graphics.loadTileSet('i/misc.png', 16, 16),
  Graphics.loadTileSet('i/font5x7.png', 5, 7),
  Graphics.loadTileSet('i/logo.png', 160, 144)
]).then(function(tilesets) {
  Assets.tiles.rearHair = tilesets[0];
  Assets.tiles.body = tilesets[1];
  Assets.tiles.face = tilesets[2];
  Assets.tiles.frontHair = tilesets[3];
  Assets.tiles.mapTiles = tilesets[4];
  Assets.font = tilesets[5];
  Assets.panels.title = tilesets[6];
  window.Game.assets = Assets;
  gameTimer.start();
});

window.addEventListener('keydown', function(event) {
  let key = event.key;
  Game.currentScreen.keydown(key, event);
});



