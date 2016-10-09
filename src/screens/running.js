import Screen from '../screen';
import Map from '../map';
import Character from '../character';
import RetryScreen from './retry';

const map01 = {
  data: "11111111111111110000011111111111111110011001111111111111111111100000111111111110000333333333300330033003322211111110044444440011001100110011111111111111X",
  messages: [
    {start: 5, end: 15, text: "PRESS Z TO JUMP"},
    {start: 25, end: 35, text: "PRESS X TO HOP"},
    {start: 47, end: 57 , text: "GOOD LUCK!"}
  ]
};

export default class RunningScreen extends Screen {
  constructor(game, character) {
    super(game);
    this.map = new Map({assets: this.game.assets, map: map01, scrollSpeed: -0.1, bg: true});
    this.character = character;
    this.character.map = this.map;
  }

  update(time) {
    this.map.update(time);
    this.character.update(time);
    if (this.character.pos.y > 200) {
      this.game.currentScreen = new RetryScreen(this.game, this.character);
    }
  }

  render(graphics) {
    graphics.clearScreen('#e6d69c');
    this.map.render(graphics);
    this.character.render(graphics);
  }

  keydown(key) {
    switch(key) {
    case 'z':
      this.character.jump();
      break;
    case 'x':
      this.character.hop();
      break;
    }
  }
}