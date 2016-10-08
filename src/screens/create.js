import Screen from '../screen';
import { mod } from '../utils';
import RunningScreen from './running';
import Character from '../character';

export default class CreateScreen extends Screen {
  constructor(game) {
    super(game);
    this.selection = 0;
    this.choices = ['rearHair', 'frontHair', 'face', 'body', 'next'];
    this.character = new Character({tiles: this.game.assets.tiles, runSpeed: 0});
    this.blink = 0;
  }

  update(time) {
    this.blink = time.ticks % 10 > 5;
  }

  render(graphics) {
    graphics.clearScreen('#b4a56a');
    graphics.drawText('CREATE A NEW RUNJUMPER', 'center', 10);
    graphics.drawText('HAIR', 80, 40);
    graphics.drawText('BANGS', 80, 50);
    graphics.drawText('FACE', 80, 60);
    graphics.drawText('BODY', 80, 70);
    graphics.drawText('RUN!', 80, 90);
    if (this.selection < 4) {
      graphics.drawText('←      →', 70, this.selection * 10 + 40);
    }
    if (this.selection === 4 && this.blink) {
      graphics.drawText('[     ]', 70, 90);
    }
    this.character.render(graphics);
  }

  nextScreen() {
    if (this.selection === 4) {
      this.game.currentScreen = new RunningScreen(this.game, this.character);
    }
  }

  selectUp() {
    this.selection = Math.max(this.selection - 1, 0);
  }

  selectDown() {
    this.selection = Math.min(this.selection + 1, this.choices.length - 1);
  }

  setLeft() {
    if (this.selection < 4) {
      this.character.setPrevPart(this.choices[this.selection]);
    }
  }

  setRight() {
    if (this.selection < 4) {
      this.character.setNextPart(this.choices[this.selection]);
    }
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
    case 'ArrowLeft':
      this.setLeft();
      event.preventDefault();
      break;
    case 'ArrowRight':
      this.setRight();
      event.preventDefault();
      break;
    }
  }
}