import Screen from '../screen';
import Map from '../map';
import Character from '../character';

const map01 = "1121111111111211111000110111211131123111111113111110011011111000011111111113331111110000000000000000000";


export default class RunningScreen extends Screen {
  constructor(game, character) {
    super(game);
    this.map = new Map(this.game.assets.Tiles, map01);
    this.character = character;
    character.map = this.map;
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
    }
  }
}