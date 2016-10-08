import Screen from '../screen';
import Map from '../map';
import Character from '../character';
import CreateScreen from './create';
import { randomInt } from '../utils';

export default class TitleScreen extends Screen {
  constructor(game) {
    super(game);
    this.map = new Map({assets: this.game.assets, mapstring: "111111111111", scrollSpeed: 0, bg: false});
    this.map.x = -27;
    this.character = new Character({tiles: this.tiles, runSpeed: 0.1});
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
      graphics.drawText('PRESS Z TO START', 'center', 90);
    }
    this.map.render(graphics);
    this.character.render(graphics);
  }

  keydown(key) {
    switch(key) {
    case 'z':
      this.game.currentScreen = new CreateScreen(this.game);
      break;
    }
  }
}