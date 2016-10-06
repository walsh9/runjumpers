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
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText('Create your Runjumper', 10, 10);
    ctx.strokeText('hair', 80, 30);
    ctx.strokeText('front', 80, 40);
    ctx.strokeText('face', 80, 50);
    ctx.strokeText('body', 80, 60);
    ctx.strokeText('GO!', 80, 80);
    if (this.selection < 4) {
      ctx.strokeText('<               >', 70, this.selection * 10 + 30);
    }
    if (this.selection === 4 && this.blink) {
      ctx.strokeText('[              ]', 70, 80);
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
    this.selection = Math.min(this.selection + 1, this.choices.length);
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