import Screen from '../screen';
import Map from '../map';
import Character from '../character';

const map01 = "111111110001111111111111111110002222222224444444000000011111111111111113311331133111111122211113333332222222224444444440000011111";

export default class RunningScreen extends Screen {
  constructor(game, character) {
    super(game);
    this.map = new Map({tiles: this.game.assets.tiles, mapstring: map01, scrollSpeed: -0.1, bg: false});
    this.character = character;
    this.character.map = this.map;
  }

  update(time) {
    this.map.update(time);
    this.character.update(time);
  }

  render(graphics, ctx) {
    graphics.clearScreen(ctx, '#b4a56a');
    this.map.render(graphics, ctx);
    this.character.render(graphics, ctx);
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