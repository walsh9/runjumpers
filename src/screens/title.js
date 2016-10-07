import Screen from '../screen';
import CreateScreen from './create';

export default class TitleScreen extends Screen {
  constructor(game) {
    super(game);
  }

  render(graphics, ctx) {
    graphics.clearScreen(ctx, '#b4a56a');
    graphics.drawText(this.game.assets.Tiles.font, 'Runjumpers', 'center', 30, ctx);
    graphics.drawText(this.game.assets.Tiles.font, 'Press z to start', 'center', 90, ctx);
  }

  keydown(key) {
    switch(key) {
    case 'z':
      this.game.currentScreen = new CreateScreen(this.game);
      break;
    }
  }
}