import Screen from '../screen';
import Map from '../map';
import Character from '../character';

const map01 = "11111111000111111111111111111000222222222444444400000011111111111111113311331133111111122211113333332222222224444444440000011111";

export default class RunningScreen extends Screen {
  constructor(game, character) {
    super(game);
    this.map = new Map({assets: this.game.assets, mapstring: map01, scrollSpeed: -0.1, bg: true});
    this.character = character;
    this.character.map = this.map;
  }

  update(time) {
    this.map.update(time);
    this.character.update(time);
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