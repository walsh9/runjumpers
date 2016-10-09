import Screen from '../screen';
import { mod } from '../utils';
import RunningScreen from './running';
import CreateScreen from './create';
import TitleScreen from './title';
import Character from '../character';

export default class Retry extends Screen {
  constructor(game, character) {
    super(game);
    this.selection = 0;
    this.choices = 2;
    this.character = character;
    this.blink = 0;
  }

  update(time) {
    this.blink = time.ticks % 10 > 5;
  }

  render(graphics) {
    graphics.drawGraphic(this.graphics.frame, 0, 0);
    graphics.drawText('YOU FELL!', 'center', 20);
    graphics.drawText('TRY AGAIN?', 'center', 54);
    graphics.drawText('NEW RUNJUMPER', 'center', 67);
    graphics.drawText('BACK TO TITLE', 'center', 80);

    if (this.blink) {
      graphics.drawText('*               *', 'center', this.selection * 13 + 54);
    }
  }

  nextScreen() {
    if (this.selection === 0) {
      this.character.pos = {x: 30, y: 55};
      this.character.velocity = {x: 0, y: 0};
      this.game.currentScreen = new RunningScreen(this.game, this.character);
    } else if (this.selection === 1) {
      this.game.currentScreen = new CreateScreen(this.game);
    } else {
      this.game.currentScreen = new TitleScreen(this.game);
    }
  }

  selectUp() {
    this.selection = Math.max(this.selection - 1, 0);
  }

  selectDown() {
    this.selection = Math.min(this.selection + 1, this.choices);
  }

  keydown(key, event) {
    switch(key) {
    case 'z':
      this.nextScreen();
      break;
    case 'ArrowUp':
      this.selectUp();
      event.preventDefault();
      break;
    case 'ArrowDown':
      this.selectDown();
      event.preventDefault();
      break;
    }
  }
}