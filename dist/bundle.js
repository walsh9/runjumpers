/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _loader = __webpack_require__(11);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	var _timer = __webpack_require__(5);
	
	var _timer2 = _interopRequireDefault(_timer);
	
	var _graphics = __webpack_require__(2);
	
	var _graphics2 = _interopRequireDefault(_graphics);
	
	var _sound = __webpack_require__(27);
	
	var _sound2 = _interopRequireDefault(_sound);
	
	var _title = __webpack_require__(7);
	
	var _title2 = _interopRequireDefault(_title);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Game = {
	  init: function init() {
	    this.currentScreen = new _title2.default(this);
	  },
	  update: function update(time) {
	    this.currentScreen.update(time);
	  },
	  render: function render() {
	    this.currentScreen.render(window.Game.graphics);
	  }
	};
	
	var load = function load() {
	  var loader = new _loader2.default();
	  loader.addTileSet('rearHair', 'i/ppl_rear_hair.png', 27, 27);
	  loader.addTileSet('body', 'i/ppl_body.png', 27, 27);
	  loader.addTileSet('face', 'i/ppl_face.png', 27, 27);
	  loader.addTileSet('frontHair', 'i/ppl_front_hair.png', 27, 27);
	  loader.addTileSet('mapTiles', 'i/misc.png', 16, 16);
	  loader.addTileSet('font', 'i/font5x7.png', 5, 7);
	  loader.addGraphic('title', 'i/logo.png');
	  loader.addGraphic('frame', 'i/frame.png');
	  loader.addGraphic('playerframe', 'i/playerframe.png');
	  for (var n = 1; n <= 10; n++) {
	    loader.addGraphic('bgDark' + n, 'i/bg/bg_slice_skyline_' + n + '_dark.png');
	    loader.addGraphic('bgLight' + n, 'i/bg/bg_slice_skyline_' + n + '_light.png');
	  }
	  return loader.load();
	};
	
	var start = function start(assets) {
	  var game = window.Game;
	  Game.assets = assets;
	  Game.level = 0;
	  Game.fallCount = 0;
	  var ctx = document.querySelector('canvas').getContext('2d');
	  Game.graphics = new _graphics2.default(ctx);
	  Game.sound = new _sound2.default();
	  Game.graphics.setFont(Game.assets.tiles.font);
	  window.addEventListener('keydown', function (event) {
	    var key = event.key;
	    Game.currentScreen.keydown(key, event);
	  });
	  var gameTimer = new _timer2.default(Game, 1 / 60);
	  gameTimer.start();
	};
	
	load().then(start);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .!?,\'":;_-+=/\\[]()#@%{}<>^*&~|→←↑↓○●$€¥'.split('');
	
	var Graphics = function () {
	  function Graphics(ctx) {
	    _classCallCheck(this, Graphics);
	
	    this.ctx = ctx;
	  }
	
	  _createClass(Graphics, [{
	    key: 'setFont',
	    value: function setFont(font) {
	      this.font = font;
	    }
	  }, {
	    key: 'clearScreen',
	    value: function clearScreen(color) {
	      this.ctx.fillStyle = color;
	      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	    }
	  }, {
	    key: 'drawTile',
	    value: function drawTile(tileSet, tileX, tileY, x, y) {
	      var tX = tileSet.tileWidth * tileX;
	      var tY = tileSet.tileHeight * tileY;
	      x = Math.floor(x);
	      y = Math.floor(y);
	      this.ctx.drawImage(tileSet.img, tX, tY, tileSet.tileWidth, tileSet.tileHeight, x, y, tileSet.tileWidth, tileSet.tileHeight);
	    }
	  }, {
	    key: 'drawGraphic',
	    value: function drawGraphic(graphic, x, y) {
	      this.drawTile(graphic, 0, 0, x, y);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _ctx;
	
	      (_ctx = this.ctx).drawImage.apply(_ctx, arguments);
	    }
	  }, {
	    key: 'drawText',
	    value: function drawText(text, x, y) {
	      if (x === 'center') {
	        x = Math.floor((this.ctx.canvas.width - text.length * (this.font.tileWidth + 1)) / 2);
	      }
	      var char = void 0,
	          charIndex = void 0,
	          charX = void 0,
	          charY = void 0;
	      for (var i = 0; i < text.length; i++) {
	        char = text.charAt(i);
	        charIndex = chars.indexOf(char);
	        charX = x + i * (this.font.tileWidth + 1);
	        charY = ['g', 'j', 'p', 'q', 'y'].indexOf(char) > -1 ? y + 2 : y;
	        this.drawTile(this.font, charIndex, 0, charX, charY, this.ctx);
	      }
	    }
	  }]);
	
	  return Graphics;
	}();
	
	exports.default = Graphics;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(4);
	
	var _sounds = __webpack_require__(28);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Character = function () {
	  function Character(charParams, map) {
	    _classCallCheck(this, Character);
	
	    this.tiles = charParams.tiles;
	    this.runSpeed = charParams.runSpeed;
	    this.sound = charParams.sound;
	    this.map = map;
	    this.parts = {};
	    this.randomizeParts();
	    this.pos = { x: 30, y: 55 };
	    this.velocity = { x: 0, y: 0 };
	    this.acceleration = { x: 0, y: 0.0005 };
	    this.state = 'standing';
	    this.runFrame = 1;
	  }
	
	  _createClass(Character, [{
	    key: 'update',
	    value: function update(time, screen) {
	      this.pos.x += time.delta * this.runSpeed;
	      var footPos = this.state === 'running' ? 10 : 18;
	      var floorHeight = 117 - this.map.heightHere(this.pos.x + footPos);
	      if (!(0, _utils.near)(this.pos.y, floorHeight, 0.1) || this.velocity.y < 0) {
	        if (this.velocity.y <= 0) {
	          this.state = 'jumping';
	        } else {
	          this.state = 'falling';
	        }
	        this.velocity.y += time.delta * this.acceleration.y;
	        if ((0, _utils.near)(this.velocity.y, 0, 0.0000001)) {
	          this.velocity.y = 0;
	        }
	        this.pos.y += time.delta * this.velocity.y;
	      } else {
	        this.state = 'running';
	        this.velocity.y = 0;
	        this.pos.y = floorHeight;
	      }
	      this.runFrame = time.ticks % 6 < 3 ? 1 : 2;
	      if (this.pos.y > 200) {
	        screen.fall();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      var animFrame = 0;
	      if (this.state === 'running') {
	        animFrame = this.runFrame;
	      } else if (this.state === 'jumping') {
	        animFrame = 3;
	      } else if (this.state === 'falling') {
	        animFrame = 0;
	      }
	      graphics.drawTile(this.tiles.rearHair, this.parts.rearHair, 0, this.pos.x, this.pos.y);
	      graphics.drawTile(this.tiles.body, this.parts.body, animFrame, this.pos.x, this.pos.y);
	      graphics.drawTile(this.tiles.face, this.parts.face, 0, this.pos.x, this.pos.y);
	      graphics.drawTile(this.tiles.frontHair, this.parts.frontHair, 0, this.pos.x, this.pos.y);
	    }
	  }, {
	    key: 'jump',
	    value: function jump() {
	      if (this.state === 'running') {
	        var _sound;
	
	        (_sound = this.sound).beep.apply(_sound, _toConsumableArray(_sounds2.default.jump));
	        this.velocity.y = -0.24;
	      }
	    }
	  }, {
	    key: 'hop',
	    value: function hop() {
	      if (this.state === 'running') {
	        var _sound2;
	
	        (_sound2 = this.sound).beep.apply(_sound2, _toConsumableArray(_sounds2.default.hop));
	        this.velocity.y = -0.135;
	      }
	    }
	  }, {
	    key: 'randomizeParts',
	    value: function randomizeParts() {
	      this.setRandomPart('rearHair');
	      this.setRandomPart('face');
	      this.setRandomPart('body');
	      this.setRandomPart('frontHair');
	    }
	  }, {
	    key: 'setRandomPart',
	    value: function setRandomPart(partName) {
	      this.parts[partName] = Math.floor(Math.random() * this.tiles[partName].tileColumns);
	    }
	  }, {
	    key: 'setNextPart',
	    value: function setNextPart(partName) {
	      this.parts[partName] = (0, _utils.mod)(this.parts[partName] + 1, this.tiles[partName].tileColumns);
	    }
	  }, {
	    key: 'setPrevPart',
	    value: function setPrevPart(partName) {
	      this.parts[partName] = (0, _utils.mod)(this.parts[partName] - 1, this.tiles[partName].tileColumns);
	    }
	  }]);
	
	  return Character;
	}();
	
	exports.default = Character;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mod = mod;
	exports.randomInt = randomInt;
	exports.randomBetween = randomBetween;
	exports.near = near;
	exports.shuffle = shuffle;
	function mod(x, y) {
	  return (x % y + y) % y;
	}
	
	function randomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function randomBetween(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	function near(num1, num2, threshold) {
	  return Math.abs(num1 - num2) <= threshold;
	}
	
	function shuffle(array) {
	  var temporaryValue = void 0,
	      randomIndex = void 0;
	  var currentIndex = array.length;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Timer = function () {
	  function Timer(game, timeStep) {
	    _classCallCheck(this, Timer);
	
	    this.time = {};
	    this.time.runTime = 0;
	    this.time.ticks = 0;
	    this.time.delta = 0;
	    this.started = false;
	    this.timeStep = timeStep;
	    this.game = game;
	  }
	
	  _createClass(Timer, [{
	    key: "start",
	    value: function start() {
	      if (this.started === false) {
	        this.started = true;
	        this.currentTime = Date.now();
	        this.game.init();
	      }
	      requestAnimationFrame(this.start.bind(this));
	      var newTime = Date.now();
	      var frameTime = newTime - this.currentTime;
	      this.currentTime = newTime;
	      while (frameTime > 0) {
	        this.time.delta = Math.min(frameTime, this.timeStep);
	        frameTime -= this.time.delta;
	        this.time.runTime += this.time.delta;
	        this.game.update(this.time);
	      }
	      this.time.ticks++;
	      this.game.render();
	    }
	  }]);
	
	  return Timer;
	}();
	
	exports.default = Timer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(4);
	
	var _sounds = __webpack_require__(28);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Y_FROM_FLOOR = [128, 112, 96, 80, 64, 48, 32, 16, 0];
	var GROUND = 0;
	var COLUMN_ROOT = 1;
	var COLUMN_MID = 2;
	var COLUMN_TOP = 3;
	var CLOUD_RIGHT = 8;
	var CLOUD_LEFT = 7;
	var PLATFORM = 9;
	var GLOW_PILLAR_1 = 12;
	var GLOW_PILLAR_2 = 13;
	var GLOW_COLUMN_1 = 14;
	var GLOW_COLUMN_2 = 15;
	var HEIGHTS = [-100, 13, 29, 45, 61, 77, 93, 13, 29, 13];
	
	var Map = function () {
	  function Map(params) {
	    _classCallCheck(this, Map);
	
	    this.tiles = params.assets.tiles;
	    this.graphics = params.assets.graphics;
	    this.sound = params.sound;
	    this.stage = params.map.data.split('');
	    this.messages = params.map.messages || [];
	    this.stageWidth = this.stage.length * this.tiles.mapTiles.tileWidth;
	    this.scrollSpeed = params.scrollSpeed;
	    this.bg = params.bg;
	    this.x = 0;
	    this.glow = 0;
	    if (this.bg) {
	      var bgSlices = (0, _utils.shuffle)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	      this.bg1 = this.createBg('Dark', 15, 0.4, bgSlices.slice(0, 5));
	      this.bg2 = this.createBg('Light', 20, 0.3, bgSlices.slice(5));
	    }
	  }
	
	  _createClass(Map, [{
	    key: 'update',
	    value: function update(time, screen) {
	      this.x += time.delta * this.scrollSpeed;
	      this.glow = time.ticks % 2;
	      var here = Math.floor((-this.x + 36) / this.tiles.mapTiles.tileWidth);
	      if (this.stage[here] === '9') {
	        screen.winLevel();
	      }
	    }
	  }, {
	    key: 'heightHere',
	    value: function heightHere(offset) {
	      var index = Math.floor((-this.x + offset) / this.tiles.mapTiles.tileWidth);
	      var tile = this.stage[index];
	      return HEIGHTS[tile];
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      var _this = this;
	
	      var leftmostTile = Math.floor(-this.x / this.tiles.mapTiles.tileWidth);
	      var rightmostTile = leftmostTile + 10;
	
	      if (this.bg) {
	        graphics.draw(this.bg2.canvas, Math.floor(this.x * this.bg2.parallaxFactor), 0);
	        graphics.draw(this.bg1.canvas, Math.floor(this.x * this.bg1.parallaxFactor), 0);
	      }
	
	      var here = Math.floor((-this.x + 11) / this.tiles.mapTiles.tileWidth);
	      for (var i = 0; i < this.messages.length; i++) {
	        var message = this.messages[i];
	        if (message.start < here && message.end > here) {
	          graphics.drawText(message.text, 'center', 10);
	        }
	      }
	
	      this.stage.forEach(function (t, index) {
	        if (index < leftmostTile || index > rightmostTile) {
	          return;
	        }
	        var x = _this.x + _this.tiles.mapTiles.tileWidth * index;
	        switch (t) {
	          case '0':
	            break;
	          case '1':
	          case '2':
	          case '3':
	          case '4':
	          case '5':
	          case '6':
	            graphics.drawTile(_this.tiles.mapTiles, PLATFORM, 0, x, Y_FROM_FLOOR[t - 1]);
	            break;
	          case '7':
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_TOP, 0, x, Y_FROM_FLOOR[0]);
	            break;
	          case '8':
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_TOP, 0, x, Y_FROM_FLOOR[1]);
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_MID, 0, x, Y_FROM_FLOOR[0]);
	            break;
	          case '9':
	            for (var _i = 1; _i < 9; _i++) {
	              graphics.drawTile(_this.tiles.mapTiles, GLOW_PILLAR_1 + _this.glow, 0, x, Y_FROM_FLOOR[_i]);
	            }
	            graphics.drawTile(_this.tiles.mapTiles, GLOW_COLUMN_1 + _this.glow, 0, x, Y_FROM_FLOOR[0]);
	            break;
	        }
	      });
	    }
	  }, {
	    key: 'createBg',
	    value: function createBg(variant, spacing, parallaxFactor, availableSlices) {
	      var minWidth = Math.floor((this.stageWidth + 320) * parallaxFactor);
	      var w = 0;
	      var possibleSlices = [];
	      var slices = [];
	      while (w < minWidth) {
	        if (possibleSlices.length === 0) {
	          possibleSlices = (0, _utils.shuffle)(availableSlices.slice());
	        }
	        var sliceId = possibleSlices.pop();
	        var slice = this.graphics['bg' + variant + sliceId];
	        slices.push(slice);
	        w += slice.width + spacing;
	      }
	
	      var canvas = document.createElement('canvas');
	      var ctx = canvas.getContext('2d');
	      canvas.width = w;
	      canvas.height = 144;
	      var x = 0;
	      slices.forEach(function (slice) {
	        var y = (0, _utils.randomInt)(0, 2);
	        ctx.drawImage(slice.img, x, y * 12);
	        x += slice.width + spacing;
	      });
	      return { canvas: canvas, parallaxFactor: parallaxFactor };
	    }
	  }]);
	
	  return Map;
	}();
	
	exports.default = Map;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _screen = __webpack_require__(8);
	
	var _screen2 = _interopRequireDefault(_screen);
	
	var _map = __webpack_require__(6);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _sounds = __webpack_require__(28);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	var _create = __webpack_require__(9);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _utils = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TitleScreen = function (_Screen) {
	  _inherits(TitleScreen, _Screen);
	
	  function TitleScreen(game) {
	    _classCallCheck(this, TitleScreen);
	
	    var _this = _possibleConstructorReturn(this, (TitleScreen.__proto__ || Object.getPrototypeOf(TitleScreen)).call(this, game));
	
	    _this.map = new _map2.default({ assets: _this.game.assets, map: { data: "111111111111" }, scrollSpeed: 0, bg: false, sound: _this.sound });
	    _this.map.x = -27;
	    _this.character = new _character2.default({ tiles: _this.tiles, runSpeed: 0.1, sound: _this.sound });
	    _this.character.pos.y = 104;
	    _this.character.pos.x = -27;
	    _this.character.map = _this.map;
	    _this.nextJump = (0, _utils.randomInt)(500, 2000);
	    return _this;
	  }
	
	  _createClass(TitleScreen, [{
	    key: 'update',
	    value: function update(time) {
	      this.blink = time.ticks % 50 < 25;
	      this.character.update(time);
	      if (this.character.pos.x > 160) {
	        this.character.randomizeParts();
	        this.character.velocity.y = 0;
	        this.character.pos.y = 104;
	        this.character.pos.x = -27;
	      }
	      if (time.runTime > this.nextJump) {
	        this.character.jump();
	        this.nextJump = time.runTime + (0, _utils.randomInt)(500, 2000);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      graphics.clearScreen('#b4a56a');
	      graphics.drawGraphic(this.graphics.title, 0, 0);
	      if (this.blink) {
	        graphics.drawText('PRESS Z TO START', 'center', 80);
	      }
	      this.map.render(graphics);
	      this.character.render(graphics);
	    }
	  }, {
	    key: 'menuChime',
	    value: function menuChime() {
	      var _sound, _sound2;
	
	      (_sound = this.sound).beep.apply(_sound, _toConsumableArray(_sounds2.default.menuSelectA));
	      (_sound2 = this.sound).beep.apply(_sound2, _toConsumableArray(_sounds2.default.menuSelectB));
	    }
	  }, {
	    key: 'keydown',
	    value: function keydown(key) {
	      switch (key) {
	        case 'z':
	          this.menuChime();
	          this.game.level = 0;
	          this.game.fallCount = 0;
	          this.game.currentScreen = new _create2.default(this.game);
	          break;
	      }
	    }
	  }]);
	
	  return TitleScreen;
	}(_screen2.default);
	
	exports.default = TitleScreen;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Screen = function () {
	  function Screen(game) {
	    _classCallCheck(this, Screen);
	
	    this.game = game;
	    this.tiles = game.assets.tiles;
	    this.graphics = game.assets.graphics;
	    this.sound = game.sound;
	  }
	
	  _createClass(Screen, [{
	    key: "update",
	    value: function update() {}
	  }, {
	    key: "render",
	    value: function render() {}
	  }, {
	    key: "keydown",
	    value: function keydown() {}
	  }]);
	
	  return Screen;
	}();
	
	exports.default = Screen;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _screen = __webpack_require__(8);
	
	var _screen2 = _interopRequireDefault(_screen);
	
	var _utils = __webpack_require__(4);
	
	var _sounds = __webpack_require__(28);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	var _running = __webpack_require__(10);
	
	var _running2 = _interopRequireDefault(_running);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CreateScreen = function (_Screen) {
	  _inherits(CreateScreen, _Screen);
	
	  function CreateScreen(game) {
	    _classCallCheck(this, CreateScreen);
	
	    var _this = _possibleConstructorReturn(this, (CreateScreen.__proto__ || Object.getPrototypeOf(CreateScreen)).call(this, game));
	
	    _this.selection = 0;
	    _this.choices = ['rearHair', 'frontHair', 'face', 'body', 'next'];
	    _this.character = new _character2.default({ tiles: _this.game.assets.tiles, runSpeed: 0, sound: _this.sound });
	    _this.blink = 0;
	    return _this;
	  }
	
	  _createClass(CreateScreen, [{
	    key: 'update',
	    value: function update(time) {
	      this.blink = time.ticks % 10 > 5;
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      graphics.drawGraphic(this.graphics.frame, 0, 0);
	      graphics.drawGraphic(this.graphics.playerframe, 0, 0);
	      graphics.drawText('CREATE A NEW RUNJUMPER', 'center', 20);
	      graphics.drawText('HAIR', 90, 50);
	      graphics.drawText('BANGS', 90, 60);
	      graphics.drawText('FACE', 90, 70);
	      graphics.drawText('BODY', 90, 80);
	      graphics.drawText('RUN!', 'center', 110);
	      if (this.selection < 4) {
	        graphics.drawText('←      →', 80, this.selection * 10 + 50);
	      }
	      if (this.selection === 4 && this.blink) {
	        graphics.drawText('*     *', 'center', 110);
	      }
	      this.character.render(graphics);
	    }
	  }, {
	    key: 'nextScreen',
	    value: function nextScreen() {
	      if (this.selection === 4) {
	        this.menuChime();
	        this.game.currentScreen = new _running2.default(this.game, this.character);
	      }
	    }
	  }, {
	    key: 'menuBeep',
	    value: function menuBeep() {
	      var _sound, _sound2;
	
	      (_sound = this.sound).beep.apply(_sound, _toConsumableArray(_sounds2.default.menuChooseA));
	      (_sound2 = this.sound).beep.apply(_sound2, _toConsumableArray(_sounds2.default.menuChooseB));
	    }
	  }, {
	    key: 'menuChime',
	    value: function menuChime() {
	      var _sound3, _sound4;
	
	      (_sound3 = this.sound).beep.apply(_sound3, _toConsumableArray(_sounds2.default.menuSelectA));
	      (_sound4 = this.sound).beep.apply(_sound4, _toConsumableArray(_sounds2.default.menuSelectB));
	    }
	  }, {
	    key: 'selectUp',
	    value: function selectUp() {
	      this.selection = Math.max(this.selection - 1, 0);
	      this.menuBeep();
	    }
	  }, {
	    key: 'selectDown',
	    value: function selectDown() {
	      this.selection = Math.min(this.selection + 1, this.choices.length - 1);
	      this.menuBeep();
	    }
	  }, {
	    key: 'setLeft',
	    value: function setLeft() {
	      if (this.selection < 4) {
	        this.character.setPrevPart(this.choices[this.selection]);
	      }
	      this.menuBeep();
	    }
	  }, {
	    key: 'setRight',
	    value: function setRight() {
	      if (this.selection < 4) {
	        this.character.setNextPart(this.choices[this.selection]);
	      }
	      this.menuBeep();
	    }
	  }, {
	    key: 'keydown',
	    value: function keydown(key, event) {
	      switch (key) {
	        case 'z':
	          this.nextScreen();
	          break;
	        case 'ArrowUp':
	          this.selectUp();
	          event.preventDefault();
	          break;
	        case 'ArrowDown':
	          this.selectDown();
	          event.preventDefault();
	          break;
	        case 'ArrowLeft':
	          this.setLeft();
	          event.preventDefault();
	          break;
	        case 'ArrowRight':
	          this.setRight();
	          event.preventDefault();
	          break;
	      }
	    }
	  }]);
	
	  return CreateScreen;
	}(_screen2.default);
	
	exports.default = CreateScreen;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _screen = __webpack_require__(8);
	
	var _screen2 = _interopRequireDefault(_screen);
	
	var _map = __webpack_require__(6);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _maps = __webpack_require__(26);
	
	var _maps2 = _interopRequireDefault(_maps);
	
	var _sounds = __webpack_require__(28);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	var _retry = __webpack_require__(25);
	
	var _retry2 = _interopRequireDefault(_retry);
	
	var _congrats = __webpack_require__(29);
	
	var _congrats2 = _interopRequireDefault(_congrats);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RunningScreen = function (_Screen) {
	  _inherits(RunningScreen, _Screen);
	
	  function RunningScreen(game, character) {
	    _classCallCheck(this, RunningScreen);
	
	    var _this = _possibleConstructorReturn(this, (RunningScreen.__proto__ || Object.getPrototypeOf(RunningScreen)).call(this, game));
	
	    _this.map = new _map2.default({ assets: _this.game.assets, map: _maps2.default[_this.game.level], scrollSpeed: -0.1, bg: true, sound: _this.sound });
	    _this.character = character;
	    _this.character.map = _this.map;
	    _this.introTimer = 2000;
	    return _this;
	  }
	
	  _createClass(RunningScreen, [{
	    key: 'update',
	    value: function update(time) {
	      if (this.introTimer > 0) {
	        this.introTimer -= time.delta;
	      } else {
	        this.map.update(time, this);
	        this.character.update(time, this);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      if (this.introTimer > 0) {
	        graphics.drawGraphic(this.graphics.frame, 0, 0);
	        graphics.drawText('LEVEL ' + (this.game.level + 1), 'center', 55);
	        graphics.drawText(_maps2.default[this.game.level].title, 'center', 70);
	      } else {
	        graphics.clearScreen('#e6d69c');
	        this.map.render(graphics);
	        this.character.render(graphics);
	      }
	    }
	  }, {
	    key: 'fall',
	    value: function fall() {
	      var _sound;
	
	      (_sound = this.sound).beep.apply(_sound, _toConsumableArray(_sounds2.default.fall));
	      this.game.fallCount++;
	      this.game.currentScreen = new _retry2.default(this.game, this.character);
	    }
	  }, {
	    key: 'winSound',
	    value: function winSound() {
	      var _sound2, _sound3;
	
	      (_sound2 = this.sound).beep.apply(_sound2, _toConsumableArray(_sounds2.default.levelWinA));
	      (_sound3 = this.sound).beep.apply(_sound3, _toConsumableArray(_sounds2.default.levelWinB));
	    }
	  }, {
	    key: 'winLevel',
	    value: function winLevel() {
	      this.winSound();
	      this.game.level++;
	      if (_maps2.default[this.game.level] !== undefined) {
	        this.game.currentScreen = new RunningScreen(this.game, this.character);
	      } else {
	        this.game.currentScreen = new _congrats2.default(this.game, this.character);
	      }
	    }
	  }, {
	    key: 'keydown',
	    value: function keydown(key) {
	      switch (key) {
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
	  }]);
	
	  return RunningScreen;
	}(_screen2.default);
	
	exports.default = RunningScreen;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _promiseFromHash = __webpack_require__(12);
	
	var _promiseFromHash2 = _interopRequireDefault(_promiseFromHash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Loader = function () {
	  function Loader() {
	    _classCallCheck(this, Loader);
	
	    this.tilesets = {};
	    this.graphics = {};
	  }
	
	  _createClass(Loader, [{
	    key: 'addGraphic',
	    value: function addGraphic(name, imageSource) {
	      this.graphics[name] = { imageSource: imageSource };
	    }
	  }, {
	    key: 'addTileSet',
	    value: function addTileSet(name, imageSource, tileWidth, tileHeight) {
	      this.tilesets[name] = { imageSource: imageSource, tileWidth: tileWidth, tileHeight: tileHeight };
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      var _this = this;
	
	      return (0, _promiseFromHash2.default)({
	        tiles: (0, _promiseFromHash2.default)(Object.keys(this.tilesets).reduce(function (accumulator, currentKey) {
	          accumulator[currentKey] = _this._loadTileSet(_this.tilesets[currentKey]);
	          return accumulator;
	        }, {})),
	        graphics: (0, _promiseFromHash2.default)(Object.keys(this.graphics).reduce(function (accumulator, currentKey) {
	          accumulator[currentKey] = _this._loadGraphic(_this.graphics[currentKey]);
	          return accumulator;
	        }, {}))
	      });
	    }
	  }, {
	    key: '_loadTileSet',
	    value: function _loadTileSet(_ref) {
	      var imageSource = _ref.imageSource;
	      var tileWidth = _ref.tileWidth;
	      var tileHeight = _ref.tileHeight;
	
	      return this._loadImage(imageSource, tileWidth, tileHeight);
	    }
	  }, {
	    key: '_loadGraphic',
	    value: function _loadGraphic(_ref2) {
	      var imageSource = _ref2.imageSource;
	
	      return this._loadImage(imageSource);
	    }
	  }, {
	    key: '_loadImage',
	    value: function _loadImage(imageSource, tileWidth, tileHeight) {
	      return new Promise(function (resolve) {
	        var imageElement = document.createElement('img');
	        imageElement.onload = function (event) {
	          var image = event.target;
	          var canvas = document.createElement('canvas');
	          var width = image.width;
	          var height = image.height;
	          canvas.width = width;
	          canvas.height = height;
	          var ctx = canvas.getContext('2d');
	          ctx.drawImage(image, 0, 0, width, height);
	          var imageData = ctx.getImageData(0, 0, width, height);
	          imageData.img = image;
	          tileWidth = tileWidth || width;
	          tileHeight = tileHeight || height;
	          imageData.tileWidth = tileWidth;
	          imageData.tileHeight = tileHeight;
	          imageData.tileColumns = Math.floor(width / tileWidth);
	          imageData.tileRows = Math.floor(height / tileHeight);
	          resolve(imageData);
	        };
	        imageElement.src = imageSource;
	      });
	    }
	  }]);
	
	  return Loader;
	}();
	
	exports.default = Loader;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = Promise || __webpack_require__(13).Promise;
	
	var isArray = function(arr) {
	    return Array.isArray(arr);
	};
	
	var isObject = function(obj) {
	    return typeof obj === 'object' && obj !== null;
	};
	
	var isSimple = function(obj) {
	    return !isArray(obj) && !isObject(obj);
	};
	
	var isPromise = function(obj) {
	    return obj && typeof obj.then === 'function';
	};
	
	var clone = function(obj) {
	    var newObj = isArray(obj) ? [] : {};
	    for (var i in obj) {
	        if (isSimple(obj[i])) {
	            newObj[i] =  obj[i];
	        } else {
	            newObj[i] = isPromise(obj[i]) ? obj[i] : clone(obj[i]);
	        }
	    }
	    return newObj;
	};
	
	var attachPromise = function(node, key, promise) {
	    return new Promise(function(resolve) {
	        promise.then(function(result) {
	            node[key] = result;
	            if (isSimple(result)) {
	                resolve(result);
	            } else {
	                return fromHash(result).then(resolve);
	            }
	        });
	    });
	};
	
	var fromHash = function(hash) { 
	    var promises = Object.keys(hash).map(function(key) {
	        if (isPromise(hash[key])) return attachPromise(hash, key, hash[key]);
	        if (!isSimple(hash[key])) return fromHash(hash[key]);
	        return hash[key];
	    });
	
	    return new Promise(function(resolve) { 
	        Promise.all(promises).then(function() {
	            resolve(hash);
	        });
	    });
	};
	
	module.exports = function(hash) {
	    if (isSimple(hash)) throw new Error(hash + ' is not an object');
	
	    return fromHash( clone(hash) );
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Promise = __webpack_require__(14).Promise;
	var polyfill = __webpack_require__(24).polyfill;
	exports.Promise = Promise;
	exports.polyfill = polyfill;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var config = __webpack_require__(15).config;
	var configure = __webpack_require__(15).configure;
	var objectOrFunction = __webpack_require__(16).objectOrFunction;
	var isFunction = __webpack_require__(16).isFunction;
	var now = __webpack_require__(16).now;
	var cast = __webpack_require__(17).cast;
	var all = __webpack_require__(18).all;
	var race = __webpack_require__(19).race;
	var staticResolve = __webpack_require__(20).resolve;
	var staticReject = __webpack_require__(21).reject;
	var asap = __webpack_require__(22).asap;
	
	var counter = 0;
	
	config.async = asap; // default async is asap;
	
	function Promise(resolver) {
	  if (!isFunction(resolver)) {
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	  }
	
	  if (!(this instanceof Promise)) {
	    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	  }
	
	  this._subscribers = [];
	
	  invokeResolver(resolver, this);
	}
	
	function invokeResolver(resolver, promise) {
	  function resolvePromise(value) {
	    resolve(promise, value);
	  }
	
	  function rejectPromise(reason) {
	    reject(promise, reason);
	  }
	
	  try {
	    resolver(resolvePromise, rejectPromise);
	  } catch(e) {
	    rejectPromise(e);
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value, error, succeeded, failed;
	
	  if (hasCallback) {
	    try {
	      value = callback(detail);
	      succeeded = true;
	    } catch(e) {
	      failed = true;
	      error = e;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (handleThenable(promise, value)) {
	    return;
	  } else if (hasCallback && succeeded) {
	    resolve(promise, value);
	  } else if (failed) {
	    reject(promise, error);
	  } else if (settled === FULFILLED) {
	    resolve(promise, value);
	  } else if (settled === REJECTED) {
	    reject(promise, value);
	  }
	}
	
	var PENDING   = void 0;
	var SEALED    = 0;
	var FULFILLED = 1;
	var REJECTED  = 2;
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var subscribers = parent._subscribers;
	  var length = subscribers.length;
	
	  subscribers[length] = child;
	  subscribers[length + FULFILLED] = onFulfillment;
	  subscribers[length + REJECTED]  = onRejection;
	}
	
	function publish(promise, settled) {
	  var child, callback, subscribers = promise._subscribers, detail = promise._detail;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    invokeCallback(settled, child, callback, detail);
	  }
	
	  promise._subscribers = null;
	}
	
	Promise.prototype = {
	  constructor: Promise,
	
	  _state: undefined,
	  _detail: undefined,
	  _subscribers: undefined,
	
	  then: function(onFulfillment, onRejection) {
	    var promise = this;
	
	    var thenPromise = new this.constructor(function() {});
	
	    if (this._state) {
	      var callbacks = arguments;
	      config.async(function invokePromiseCallback() {
	        invokeCallback(promise._state, thenPromise, callbacks[promise._state - 1], promise._detail);
	      });
	    } else {
	      subscribe(this, thenPromise, onFulfillment, onRejection);
	    }
	
	    return thenPromise;
	  },
	
	  'catch': function(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	Promise.all = all;
	Promise.cast = cast;
	Promise.race = race;
	Promise.resolve = staticResolve;
	Promise.reject = staticReject;
	
	function handleThenable(promise, value) {
	  var then = null,
	  resolved;
	
	  try {
	    if (promise === value) {
	      throw new TypeError("A promises callback cannot return that same promise.");
	    }
	
	    if (objectOrFunction(value)) {
	      then = value.then;
	
	      if (isFunction(then)) {
	        then.call(value, function(val) {
	          if (resolved) { return true; }
	          resolved = true;
	
	          if (value !== val) {
	            resolve(promise, val);
	          } else {
	            fulfill(promise, val);
	          }
	        }, function(val) {
	          if (resolved) { return true; }
	          resolved = true;
	
	          reject(promise, val);
	        });
	
	        return true;
	      }
	    }
	  } catch (error) {
	    if (resolved) { return true; }
	    reject(promise, error);
	    return true;
	  }
	
	  return false;
	}
	
	function resolve(promise, value) {
	  if (promise === value) {
	    fulfill(promise, value);
	  } else if (!handleThenable(promise, value)) {
	    fulfill(promise, value);
	  }
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) { return; }
	  promise._state = SEALED;
	  promise._detail = value;
	
	  config.async(publishFulfillment, promise);
	}
	
	function reject(promise, reason) {
	  if (promise._state !== PENDING) { return; }
	  promise._state = SEALED;
	  promise._detail = reason;
	
	  config.async(publishRejection, promise);
	}
	
	function publishFulfillment(promise) {
	  publish(promise, promise._state = FULFILLED);
	}
	
	function publishRejection(promise) {
	  publish(promise, promise._state = REJECTED);
	}
	
	exports.Promise = Promise;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	var config = {
	  instrument: false
	};
	
	function configure(name, value) {
	  if (arguments.length === 2) {
	    config[name] = value;
	  } else {
	    return config[name];
	  }
	}
	
	exports.config = config;
	exports.configure = configure;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	function objectOrFunction(x) {
	  return isFunction(x) || (typeof x === "object" && x !== null);
	}
	
	function isFunction(x) {
	  return typeof x === "function";
	}
	
	function isArray(x) {
	  return Object.prototype.toString.call(x) === "[object Array]";
	}
	
	// Date.now is not available in browsers < IE9
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
	var now = Date.now || function() { return new Date().getTime(); };
	
	
	exports.objectOrFunction = objectOrFunction;
	exports.isFunction = isFunction;
	exports.isArray = isArray;
	exports.now = now;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	/**
	  `RSVP.Promise.cast` returns the same promise if that promise shares a constructor
	  with the promise being casted.
	
	  Example:
	
	  ```javascript
	  var promise = RSVP.resolve(1);
	  var casted = RSVP.Promise.cast(promise);
	
	  console.log(promise === casted); // true
	  ```
	
	  In the case of a promise whose constructor does not match, it is assimilated.
	  The resulting promise will fulfill or reject based on the outcome of the
	  promise being casted.
	
	  In the case of a non-promise, a promise which will fulfill with that value is
	  returned.
	
	  Example:
	
	  ```javascript
	  var value = 1; // could be a number, boolean, string, undefined...
	  var casted = RSVP.Promise.cast(value);
	
	  console.log(value === casted); // false
	  console.log(casted instanceof RSVP.Promise) // true
	
	  casted.then(function(val) {
	    val === value // => true
	  });
	  ```
	
	  `RSVP.Promise.cast` is similar to `RSVP.resolve`, but `RSVP.Promise.cast` differs in the
	  following ways:
	  * `RSVP.Promise.cast` serves as a memory-efficient way of getting a promise, when you
	  have something that could either be a promise or a value. RSVP.resolve
	  will have the same effect but will create a new promise wrapper if the
	  argument is a promise.
	  * `RSVP.Promise.cast` is a way of casting incoming thenables or promise subclasses to
	  promises of the exact class specified, so that the resulting object's `then` is
	  ensured to have the behavior of the constructor you are calling cast on (i.e., RSVP.Promise).
	
	  @method cast
	  @for RSVP
	  @param {Object} object to be casted
	  @return {Promise} promise that is fulfilled when all properties of `promises`
	  have been fulfilled, or rejected if any of them become rejected.
	*/
	
	
	function cast(object) {
	  /*jshint validthis:true */
	  if (object && typeof object === 'object' && object.constructor === this) {
	    return object;
	  }
	
	  var Promise = this;
	
	  return new Promise(function(resolve) {
	    resolve(object);
	  });
	}
	
	exports.cast = cast;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* global toString */
	
	var isArray = __webpack_require__(16).isArray;
	var isFunction = __webpack_require__(16).isFunction;
	
	/**
	  Returns a promise that is fulfilled when all the given promises have been
	  fulfilled, or rejected if any of them become rejected. The return promise
	  is fulfilled with an array that gives all the values in the order they were
	  passed in the `promises` array argument.
	
	  Example:
	
	  ```javascript
	  var promise1 = RSVP.resolve(1);
	  var promise2 = RSVP.resolve(2);
	  var promise3 = RSVP.resolve(3);
	  var promises = [ promise1, promise2, promise3 ];
	
	  RSVP.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `RSVP.all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  var promise1 = RSVP.resolve(1);
	  var promise2 = RSVP.reject(new Error("2"));
	  var promise3 = RSVP.reject(new Error("3"));
	  var promises = [ promise1, promise2, promise3 ];
	
	  RSVP.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @for RSVP
	  @param {Array} promises
	  @param {String} label
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	*/
	function all(promises) {
	  /*jshint validthis:true */
	  var Promise = this;
	
	  if (!isArray(promises)) {
	    throw new TypeError('You must pass an array to all.');
	  }
	
	  return new Promise(function(resolve, reject) {
	    var results = [], remaining = promises.length,
	    promise;
	
	    if (remaining === 0) {
	      resolve([]);
	    }
	
	    function resolver(index) {
	      return function(value) {
	        resolveAll(index, value);
	      };
	    }
	
	    function resolveAll(index, value) {
	      results[index] = value;
	      if (--remaining === 0) {
	        resolve(results);
	      }
	    }
	
	    for (var i = 0; i < promises.length; i++) {
	      promise = promises[i];
	
	      if (promise && isFunction(promise.then)) {
	        promise.then(resolver(i), reject);
	      } else {
	        resolveAll(i, promise);
	      }
	    }
	  });
	}
	
	exports.all = all;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* global toString */
	var isArray = __webpack_require__(16).isArray;
	
	/**
	  `RSVP.race` allows you to watch a series of promises and act as soon as the
	  first promise given to the `promises` argument fulfills or rejects.
	
	  Example:
	
	  ```javascript
	  var promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve("promise 1");
	    }, 200);
	  });
	
	  var promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve("promise 2");
	    }, 100);
	  });
	
	  RSVP.race([promise1, promise2]).then(function(result){
	    // result === "promise 2" because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `RSVP.race` is deterministic in that only the state of the first completed
	  promise matters. For example, even if other promises given to the `promises`
	  array argument are resolved, but the first completed promise has become
	  rejected before the other promises became fulfilled, the returned promise
	  will become rejected:
	
	  ```javascript
	  var promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve("promise 1");
	    }, 200);
	  });
	
	  var promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error("promise 2"));
	    }, 100);
	  });
	
	  RSVP.race([promise1, promise2]).then(function(result){
	    // Code here never runs because there are rejected promises!
	  }, function(reason){
	    // reason.message === "promise2" because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  @method race
	  @for RSVP
	  @param {Array} promises array of promises to observe
	  @param {String} label optional string for describing the promise returned.
	  Useful for tooling.
	  @return {Promise} a promise that becomes fulfilled with the value the first
	  completed promises is resolved with if the first completed promise was
	  fulfilled, or rejected with the reason that the first completed promise
	  was rejected with.
	*/
	function race(promises) {
	  /*jshint validthis:true */
	  var Promise = this;
	
	  if (!isArray(promises)) {
	    throw new TypeError('You must pass an array to race.');
	  }
	  return new Promise(function(resolve, reject) {
	    var results = [], promise;
	
	    for (var i = 0; i < promises.length; i++) {
	      promise = promises[i];
	
	      if (promise && typeof promise.then === 'function') {
	        promise.then(resolve, reject);
	      } else {
	        resolve(promise);
	      }
	    }
	  });
	}
	
	exports.race = race;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	/**
	  `RSVP.resolve` returns a promise that will become fulfilled with the passed
	  `value`. `RSVP.resolve` is essentially shorthand for the following:
	
	  ```javascript
	  var promise = new RSVP.Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  var promise = RSVP.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @for RSVP
	  @param {Any} value value that the returned promise will be resolved with
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(value) {
	  /*jshint validthis:true */
	  var Promise = this;
	  return new Promise(function(resolve, reject) {
	    resolve(value);
	  });
	}
	
	exports.resolve = resolve;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	/**
	  `RSVP.reject` returns a promise that will become rejected with the passed
	  `reason`. `RSVP.reject` is essentially shorthand for the following:
	
	  ```javascript
	  var promise = new RSVP.Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  var promise = RSVP.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @for RSVP
	  @param {Any} reason value that the returned promise will be rejected with.
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise that will become rejected with the given
	  `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Promise = this;
	
	  return new Promise(function (resolve, reject) {
	    reject(reason);
	  });
	}
	
	exports.reject = reject;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";
	var browserGlobal = (typeof window !== 'undefined') ? window : {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var local = (typeof global !== 'undefined') ? global : (this === undefined? window:this);
	
	// node
	function useNextTick() {
	  return function() {
	    process.nextTick(flush);
	  };
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function() {
	    node.data = (iterations = ++iterations % 2);
	  };
	}
	
	function useSetTimeout() {
	  return function() {
	    local.setTimeout(flush, 1);
	  };
	}
	
	var queue = [];
	function flush() {
	  for (var i = 0; i < queue.length; i++) {
	    var tuple = queue[i];
	    var callback = tuple[0], arg = tuple[1];
	    callback(arg);
	  }
	  queue = [];
	}
	
	var scheduleFlush;
	
	// Decide what async method to use to triggering processing of queued callbacks:
	if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function asap(callback, arg) {
	  var length = queue.push([callback, arg]);
	  if (length === 1) {
	    // If length is 1, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    scheduleFlush();
	  }
	}
	
	exports.asap = asap;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(23)))

/***/ },
/* 23 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/*global self*/
	var RSVPPromise = __webpack_require__(14).Promise;
	var isFunction = __webpack_require__(16).isFunction;
	
	function polyfill() {
	  var local;
	
	  if (typeof global !== 'undefined') {
	    local = global;
	  } else if (typeof window !== 'undefined' && window.document) {
	    local = window;
	  } else {
	    local = self;
	  }
	
	  var es6PromiseSupport = 
	    "Promise" in local &&
	    // Some of these methods are missing from
	    // Firefox/Chrome experimental implementations
	    "cast" in local.Promise &&
	    "resolve" in local.Promise &&
	    "reject" in local.Promise &&
	    "all" in local.Promise &&
	    "race" in local.Promise &&
	    // Older version of the spec had a resolver object
	    // as the arg rather than a function
	    (function() {
	      var resolve;
	      new local.Promise(function(r) { resolve = r; });
	      return isFunction(resolve);
	    }());
	
	  if (!es6PromiseSupport) {
	    local.Promise = RSVPPromise;
	  }
	}
	
	exports.polyfill = polyfill;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _screen = __webpack_require__(8);
	
	var _screen2 = _interopRequireDefault(_screen);
	
	var _utils = __webpack_require__(4);
	
	var _sounds = __webpack_require__(28);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	var _running = __webpack_require__(10);
	
	var _running2 = _interopRequireDefault(_running);
	
	var _create = __webpack_require__(9);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _title = __webpack_require__(7);
	
	var _title2 = _interopRequireDefault(_title);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Retry = function (_Screen) {
	  _inherits(Retry, _Screen);
	
	  function Retry(game, character) {
	    _classCallCheck(this, Retry);
	
	    var _this = _possibleConstructorReturn(this, (Retry.__proto__ || Object.getPrototypeOf(Retry)).call(this, game));
	
	    _this.selection = 0;
	    _this.choices = 2;
	    _this.character = character;
	    _this.blink = 0;
	    return _this;
	  }
	
	  _createClass(Retry, [{
	    key: 'update',
	    value: function update(time) {
	      this.blink = time.ticks % 10 > 5;
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      graphics.drawGraphic(this.graphics.frame, 0, 0);
	      graphics.drawText('YOU FELL!', 'center', 20);
	      graphics.drawText('TRY AGAIN?', 'center', 54);
	      graphics.drawText('NEW RUNJUMPER', 'center', 67);
	      graphics.drawText('BACK TO TITLE', 'center', 80);
	
	      if (this.blink) {
	        graphics.drawText('*               *', 'center', this.selection * 13 + 54);
	      }
	
	      graphics.drawText('FALLS: ' + this.game.fallCount, 'center', 120);
	    }
	  }, {
	    key: 'nextScreen',
	    value: function nextScreen() {
	      this.menuChime();
	      if (this.selection === 0) {
	        this.character.pos = { x: 30, y: 55 };
	        this.character.velocity = { x: 0, y: 0 };
	        this.game.currentScreen = new _running2.default(this.game, this.character);
	      } else if (this.selection === 1) {
	        this.game.currentScreen = new _create2.default(this.game);
	      } else {
	        this.game.currentScreen = new _title2.default(this.game);
	      }
	    }
	  }, {
	    key: 'menuBeep',
	    value: function menuBeep() {
	      var _sound, _sound2;
	
	      (_sound = this.sound).beep.apply(_sound, _toConsumableArray(_sounds2.default.menuChooseA));
	      (_sound2 = this.sound).beep.apply(_sound2, _toConsumableArray(_sounds2.default.menuChooseB));
	    }
	  }, {
	    key: 'menuChime',
	    value: function menuChime() {
	      var _sound3, _sound4;
	
	      (_sound3 = this.sound).beep.apply(_sound3, _toConsumableArray(_sounds2.default.menuSelectA));
	      (_sound4 = this.sound).beep.apply(_sound4, _toConsumableArray(_sounds2.default.menuSelectB));
	    }
	  }, {
	    key: 'selectUp',
	    value: function selectUp() {
	      this.selection = Math.max(this.selection - 1, 0);
	      this.menuBeep();
	    }
	  }, {
	    key: 'selectDown',
	    value: function selectDown() {
	      this.selection = Math.min(this.selection + 1, this.choices);
	      this.menuBeep();
	    }
	  }, {
	    key: 'keydown',
	    value: function keydown(key, event) {
	      switch (key) {
	        case 'z':
	          this.nextScreen();
	          break;
	        case 'ArrowUp':
	          this.selectUp();
	          event.preventDefault();
	          break;
	        case 'ArrowDown':
	          this.selectDown();
	          event.preventDefault();
	          break;
	      }
	    }
	  }]);
	
	  return Retry;
	}(_screen2.default);
	
	exports.default = Retry;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = [{ title: "WELCOME TO RUNJUMPERS",
	  data: "7777777777777777000007777777777777777007700770077777777777777777700000111111111110000333333333300330033003322211111110044444440011001100110077777777777777977",
	  messages: [{ start: 3, end: 15, text: "PRESS Z TO JUMP" }, { start: 25, end: 35, text: "PRESS X TO HOP" }, { start: 47, end: 57, text: "GOOD LUCK!" }] }, { title: "HOP, SKIP, JUMP",
	  data: "7777777777777777000088888800770000088000000777777777777770002220004440006666666666005004003002007777777777700070007000700077777777770000077777777777777977",
	  messages: [{ start: 3, end: 15, text: "GOOD LUCK!" }] }, { title: "UPS AND DOWNS",
	  data: "777777777777777700008800088000880000022200222001555155515551555103333333300000333333300330033000007777770077777777977",
	  messages: [{ start: 3, end: 15, text: "GOOD LUCK!" }] }, { title: "JUMPRUNNERS",
	  data: "777777777777777700033300033300100000200000300000400000555000555000003330010501050105010501050103010007777700000888888000007777700770077007700777777977",
	  messages: [{ start: 3, end: 15, text: "GOOD LUCK!" }] }, { title: "THE FINAL CHALLENGE",
	  data: "777777777777777700003300100004400010000333003330000220000100044400000077700770007700070007007770000077777777977",
	  messages: [{ start: 3, end: 15, text: "GOOD LUCK!" }] }];

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BeepMaker = function BeepMaker() {
	  var audioContext = window.AudioContext || window.webkitAudioContext;
	  this.context = new audioContext();
	  this.muted = false;
	
	  this.freqMutator = 1;
	  this.freq2Mutator = 1;
	  this.timeMutator = 1;
	};
	
	BeepMaker.prototype.beep = function (frequency, frequency2, type, durationSeconds, volume) {
	  if (this.muted) {
	    return;
	  }
	  var ctx = this.context;
	  var osc = ctx.createOscillator();
	  var gainOsc = ctx.createGain();
	
	  var vol = volume || 0.5;
	  osc.type = type;
	  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
	  osc.frequency.exponentialRampToValueAtTime(frequency2, ctx.currentTime + durationSeconds * 0.9);
	  osc.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + durationSeconds);
	
	  gainOsc.gain.setValueAtTime(vol, ctx.currentTime);
	  gainOsc.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSeconds);
	
	  osc.connect(gainOsc);
	  gainOsc.connect(ctx.destination);
	
	  osc.start(ctx.currentTime);
	  osc.stop(ctx.currentTime + durationSeconds);
	};
	
	exports.default = BeepMaker;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  jump: [500, 3500, 'square', 0.3],
	  hop: [500, 1500, 'square', 0.2],
	  fall: [1500, 500, 'sine', 2],
	  menuChooseA: [1000, 1500, 'triangle', 0.1],
	  menuChooseB: [1100, 2800, 'triangle', 0.2],
	  menuSelectA: [2000, 2000, 'square', 0.8, 0.1],
	  menuSelectB: [2500, 2500, 'square', 1.0, 0.1],
	  levelWinA: [2000, 2000, 'square', 1.5, 0.1],
	  levelWinB: [1000, 2500, 'square', 1.7, 0.1]
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _screen = __webpack_require__(8);
	
	var _screen2 = _interopRequireDefault(_screen);
	
	var _utils = __webpack_require__(4);
	
	var _sounds = __webpack_require__(28);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	var _running = __webpack_require__(10);
	
	var _running2 = _interopRequireDefault(_running);
	
	var _create = __webpack_require__(9);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _title = __webpack_require__(7);
	
	var _title2 = _interopRequireDefault(_title);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CongratsScreen = function (_Screen) {
	  _inherits(CongratsScreen, _Screen);
	
	  function CongratsScreen(game, character) {
	    _classCallCheck(this, CongratsScreen);
	
	    var _this = _possibleConstructorReturn(this, (CongratsScreen.__proto__ || Object.getPrototypeOf(CongratsScreen)).call(this, game));
	
	    _this.selection = 0;
	    _this.choices = 2;
	    _this.character = character;
	    _this.character.pos = { x: 67, y: 53 };
	    _this.character.speed = { x: 0, y: 0 };
	    return _this;
	  }
	
	  _createClass(CongratsScreen, [{
	    key: 'update',
	    value: function update(time) {
	      this.character.state = 'running';
	      this.character.runFrame = time.ticks % 6 < 3 ? 1 : 2;
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      graphics.drawGraphic(this.graphics.frame, 0, 0);
	      this.character.render(graphics);
	      graphics.drawText('CONGRATULATIONS!', 'center', 20);
	      graphics.drawText('YOU REALLY DID IT!', 'center', 35);
	      graphics.drawText('THANKS FOR PLAYING!', 'center', 100);
	      graphics.drawText('FALLS: ' + this.game.fallCount, 'center', 120);
	    }
	  }]);
	
	  return CongratsScreen;
	}(_screen2.default);
	
	exports.default = CongratsScreen;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map