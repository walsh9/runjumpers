import Screen from '../screen';
import { mod } from '../utils';
import sounds from '../sounds';
import RunningScreen from './running';
import CreateScreen from './create';
import TitleScreen from './title';
import Character from '../character';

export default class CongratsScreen extends Screen {
  constructor(game, character) {
    super(game);
    this.selection = 0;
    this.choices = 2;
    this.character = character;
    this.character.pos = {x: 67, y: 53};
    this.character.speed = {x: 0, y: 0};
  }

  update(time) {
    this.character.state = 'running';
    this.character.runFrame = (time.ticks % 6) < 3 ? 1 : 2;
  }

  render(graphics) {
    graphics.drawGraphic(this.graphics.frame, 0, 0);
    this.character.render(graphics);
    graphics.drawText('CONGRATULATIONS!', 'center', 20);
    graphics.drawText('YOU REALLY DID IT!', 'center', 35);
    graphics.drawText('THANKS FOR PLAYING!', 'center', 100);
    graphics.drawText(`FALLS: ${this.game.fallCount}`, 'center', 120);
  }

}