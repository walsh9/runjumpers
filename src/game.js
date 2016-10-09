import Loader from './loader';
import Timer from './timer';
import Graphics from './graphics';
import BeepMaker from './sound';
import TitleScreen from './screens/title';

window.Game = {
  init() {
    this.currentScreen = new TitleScreen(this);
  },
  update(time) {
    this.currentScreen.update(time);
  },
  render() {
    this.currentScreen.render(window.Game.graphics);
  }
};

let load = function() {
  let loader = new Loader();
  loader.addTileSet('rearHair', 'i/ppl_rear_hair.png', 27, 27);
  loader.addTileSet('body', 'i/ppl_body.png', 27, 27);
  loader.addTileSet('face', 'i/ppl_face.png', 27, 27);
  loader.addTileSet('frontHair', 'i/ppl_front_hair.png', 27, 27);
  loader.addTileSet('mapTiles', 'i/misc.png', 16, 16);
  loader.addTileSet('font', 'i/font5x7.png', 5, 7);
  loader.addGraphic('title', 'i/logo.png');
  loader.addGraphic('frame', 'i/frame.png');
  loader.addGraphic('playerframe', 'i/playerframe.png');
  for(let n = 1; n <= 10; n++){
    loader.addGraphic(`bgDark${n}`, `i/bg/bg_slice_skyline_${n}_dark.png`);
    loader.addGraphic(`bgLight${n}`, `i/bg/bg_slice_skyline_${n}_light.png`);
  }
  return loader.load();
};

let start = function(assets) {
  let game = window.Game;
  Game.assets = assets;
  Game.level = 0;
  Game.fallCount = 0;
  let ctx = document.querySelector('canvas').getContext('2d');
  Game.graphics = new Graphics(ctx);
  Game.sound = new BeepMaker();
  Game.graphics.setFont(Game.assets.tiles.font);
  window.addEventListener('keydown', function(event) {
    let key = event.key;
    Game.currentScreen.keydown(key, event);
  });
  let gameTimer = new Timer(Game, 1 / 60);
  gameTimer.start();
};

load().then(start);



