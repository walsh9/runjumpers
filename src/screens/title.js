import Screen from '../screen';
import CreateScreen from './create';

export default class TitleScreen extends Screen {
  constructor(game) {
    super(game);
  }

  render(graphics, ctx) {
    // graphics.clearScreen(ctx, '#b4a56a');
    graphics.drawTile(this.game.assets.panels.title, 0, 0, 0, 0, ctx);
    graphics.drawText(this.game.assets.font, 'PRESS Z TO START', 'center', 90, ctx);
  }

  keydown(key) {
    switch(key) {
    case 'z':
      this.game.currentScreen = new CreateScreen(this.game);
      break;
    }
  }
}