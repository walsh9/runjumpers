import Screen from '../screen';
import Map from '../map';
import maps from '../maps';
import sounds from '../sounds';
import Character from '../character';
import RetryScreen from './retry';
import CongratsScreen from './congrats';

export default class RunningScreen extends Screen {
  constructor(game, character) {
    super(game);
    this.map = new Map({assets: this.game.assets, map: maps[this.game.level], scrollSpeed: -0.1, bg: true, sound: this.sound});
    this.character = character;
    this.character.map = this.map;
    this.introTimer = 2000;
  }

  update(time) {
    if (this.introTimer > 0) {
      this.introTimer -= time.delta;
    } else {
      this.map.update(time, this);
      this.character.update(time, this);
    }
  }

  render(graphics) {
    if (this.introTimer > 0) {
      graphics.drawGraphic(this.graphics.frame, 0, 0);
      graphics.drawText(`LEVEL ${this.game.level + 1}`, 'center', 55);
      graphics.drawText(maps[this.game.level].title, 'center',70);
    } else {
      graphics.clearScreen('#e6d69c');
      this.map.render(graphics);
      this.character.render(graphics);
    }
  }

  fall() {
    this.sound.beep(...sounds.fall);
    this.game.fallCount++;
    this.game.currentScreen = new RetryScreen(this.game, this.character);
  }

  winSound() {
    this.sound.beep(...sounds.levelWinA);
    this.sound.beep(...sounds.levelWinB);
  }

  winLevel() {
    this.winSound();
    this.game.level++;
    if (maps[this.game.level] !== undefined) {
      this.game.currentScreen = new RunningScreen(this.game, this.character);
    } else {
      this.game.currentScreen = new CongratsScreen(this.game, this.character);
    }
  }

  keydown(key) {
    switch(key) {
    case 'z':
      if (this.introTimer > 0) {
        this.introTimer = 0;
      } else {
        this.character.jump();
      }
      break;
    case 'x':
      this.character.hop();
      break;
    }
  }
}