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
  window.Game.assets = Assets;
  gameTimer.start();
});

window.addEventListener('keydown', function(event) {
  let key = event.key;
  Game.currentScreen.keydown(key, event);
});



