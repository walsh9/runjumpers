import Screen from '../screen';
import Map from '../map';
import sounds from '../sounds';
import Character from '../character';
import CreateScreen from './create';
import { randomInt } from '../utils';

export default class TitleScreen extends Screen {
  constructor(game) {
    super(game);
    this.map = new Map({assets: this.game.assets, map:{data: "111111111111"}, scrollSpeed: 0, bg: false, sound: this.sound});
    this.map.x = -27;
    this.character = new Character({tiles: this.tiles, runSpeed: 0.1, sound: this.sound});
    this.character.pos.y = 104;
    this.character.pos.x = -27;
    this.character.map = this.map;
    this.nextJump = randomInt(500, 2000);
  }

  update(time) {
    this.blink = time.ticks % 50 < 25;
    this.character.update(time);
    if (this.character.pos.x > 160) {
      this.character.randomizeParts();
      this.character.velocity.y = 0;
      this.character.pos.y = 104;
      this.character.pos.x = -27;
    }
    if (time.runTime > this.nextJump) {
      this.character.jump();
      this.nextJump = time.runTime + randomInt(500, 2000);
    }
  }

  render(graphics) {
    graphics.clearScreen('#b4a56a');
    graphics.drawGraphic(this.graphics.title, 0, 0);
    if (this.blink) {
      graphics.drawText('PRESS Z TO START', 'center', 80);
    }
    this.map.render(graphics);
    this.character.render(graphics);
  }

  menuChime() {
    this.sound.beep(...sounds.menuSelectA);
    this.sound.beep(...sounds.menuSelectB);
  }

  keydown(key) {
    switch(key) {
    case 'z':
      this.menuChime();
      this.game.level = 0;
      this.game.fallCount = 0;
      this.game.currentScreen = new CreateScreen(this.game);
      break;
    }
  }
}