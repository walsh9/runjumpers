import Screen from '../screen';
import { mod } from '../utils';
import sounds from '../sounds';
import RunningScreen from './running';
import Character from '../character';

export default class CreateScreen extends Screen {
  constructor(game) {
    super(game);
    this.selection = 0;
    this.choices = ['rearHair', 'frontHair', 'face', 'body', 'next'];
    this.character = new Character({tiles: this.game.assets.tiles, runSpeed: 0, sound: this.sound});
    this.blink = 0;
  }

  update(time) {
    this.blink = time.ticks % 10 > 5;
  }

  render(graphics) {
    graphics.drawGraphic(this.graphics.frame, 0, 0);
    graphics.drawGraphic(this.graphics.playerframe, 0, 0);
    graphics.drawText('CREATE A NEW RUNJUMPER', 'center', 20);
    graphics.drawText('HAIR', 90, 50);
    graphics.drawText('BANGS', 90, 60);
    graphics.drawText('FACE', 90, 70);
    graphics.drawText('BODY', 90, 80);
    graphics.drawText('RUN!', 'center', 110);
    if (this.selection < 4) {
      graphics.drawText('←      →', 80, this.selection * 10 + 50);
    }
    if (this.selection === 4 && this.blink) {
      graphics.drawText('*     *', 'center', 110);
    }
    this.character.render(graphics);
  }

  nextScreen() {
    if (this.selection === 4) {
      this.menuChime();
      this.game.currentScreen = new RunningScreen(this.game, this.character);
    }
  }

  menuBeep() {
    this.sound.beep(...sounds.menuChooseA);
    this.sound.beep(...sounds.menuChooseB);
  }

  menuChime() {
    this.sound.beep(...sounds.menuSelectA);
    this.sound.beep(...sounds.menuSelectB);
  }

  selectUp() {
    this.selection = Math.max(this.selection - 1, 0);
    this.menuBeep();
  }

  selectDown() {
    this.selection = Math.min(this.selection + 1, this.choices.length - 1);
    this.menuBeep();
  }

  setLeft() {
    if (this.selection < 4) {
      this.character.setPrevPart(this.choices[this.selection]);
    }
    this.menuBeep();
  }

  setRight() {
    if (this.selection < 4) {
      this.character.setNextPart(this.choices[this.selection]);
    }
    this.menuBeep();
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