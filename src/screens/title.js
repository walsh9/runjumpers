import Screen from '../screen';
import CreateScreen from './create';

export default class TitleScreen extends Screen {
  constructor(game) {
    super(game);
  }

  render(graphics, ctx) {
    graphics.clearScreen(ctx, '#b4a56a');
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText('runjumpers', 30, 30);
    ctx.strokeText('press z to start', 30, 90);
  }

  keydown(key) {
    switch(key) {
    case 'z':
      console.log('good');
      this.game.currentScreen = new CreateScreen(this.game);
      break;
    }
  }
}