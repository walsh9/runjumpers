import Screen from '../screen';
import { mod } from '../utils';
import RunningScreen from './running';
import Character from '../character';

export default class CreateScreen extends Screen {
  constructor(game) {
    super(game);
    this.selection = 0;
    this.choices = ['rearHair', 'frontHair', 'face', 'body', 'next'];
    this.character = new Character(this.game.assets.Tiles);
    this.blink = 0;
  }

  update(time) {
    this.blink = time.ticks % 10 > 5;
  }

  render(graphics, ctx) {
    graphics.clearScreen(ctx, '#b4a56a');
    graphics.drawText(this.game.assets.Tiles.font, 'Create your Runjumper', 10, 10, ctx);
    graphics.drawText(this.game.assets.Tiles.font, 'hair', 80, 30, ctx);
    graphics.drawText(this.game.assets.Tiles.font, 'bangs', 80, 40, ctx);
    graphics.drawText(this.game.assets.Tiles.font, 'face', 80, 50, ctx);
    graphics.drawText(this.game.assets.Tiles.font, 'body', 80, 60, ctx);
    graphics.drawText(this.game.assets.Tiles.font, 'RUN!', 80, 80, ctx);
    if (this.selection < 4) {
      graphics.drawText(this.game.assets.Tiles.font, '←      →', 70, this.selection * 10 + 30, ctx);
    }
    if (this.selection === 4 && this.blink) {
      graphics.drawText(this.game.assets.Tiles.font, '[     ]', 70, 80, ctx);
    }
    this.character.render(graphics, ctx);
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