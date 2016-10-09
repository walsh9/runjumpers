export default class Screen {
  constructor(game) {
    this.game = game;
    this.tiles = game.assets.tiles;
    this.graphics = game.assets.graphics;
    this.sound = game.sound;
  }
  update () {}
  render () {}
  keydown() {}
}