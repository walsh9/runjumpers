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
	
	var _graphics = __webpack_require__(2);
	
	var _graphics2 = _interopRequireDefault(_graphics);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	var _timer = __webpack_require__(5);
	
	var _timer2 = _interopRequireDefault(_timer);
	
	var _map = __webpack_require__(6);
	
	var _map2 = _interopRequireDefault(_map);
	
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
	    this.currentScreen.render(_graphics2.default, Gamestate.ctx);
	  }
	};
	var gameTimer = new _timer2.default(Game, 1 / 60);
	
	var Gamestate = {};
	Gamestate.ctx = document.querySelector('canvas').getContext('2d');
	var Assets = {};
	Assets.Tiles = {};
	Promise.all([_graphics2.default.loadTileSet('i/ppl_rear_hair.png', 27, 27), _graphics2.default.loadTileSet('i/ppl_body.png', 27, 27), _graphics2.default.loadTileSet('i/ppl_face.png', 27, 27), _graphics2.default.loadTileSet('i/ppl_front_hair.png', 27, 27), _graphics2.default.loadTileSet('i/misc.png', 16, 16), _graphics2.default.loadTileSet('i/font5x7.png', 5, 7)]).then(function (tilesets) {
	  Assets.Tiles.rearHair = tilesets[0];
	  Assets.Tiles.body = tilesets[1];
	  Assets.Tiles.face = tilesets[2];
	  Assets.Tiles.frontHair = tilesets[3];
	  Assets.Tiles.mapTiles = tilesets[4];
	  Assets.Tiles.font = tilesets[5];
	  window.Game.assets = Assets;
	  gameTimer.start();
	});
	
	window.addEventListener('keydown', function (event) {
	  var key = event.key;
	  Game.currentScreen.keydown(key, event);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Graphics = {};
	
	Graphics.loadTileSet = function (imageSource, tileWidth, tileHeight) {
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
	      imageData.tileWidth = tileWidth;
	      imageData.tileHeight = tileHeight;
	      imageData.tileColumns = Math.floor(width / tileWidth);
	      imageData.tileRows = Math.floor(height / tileHeight);
	      resolve(imageData);
	    };
	    imageElement.src = imageSource;
	  });
	};
	
	Graphics.clearScreen = function (ctx, color) {
	  ctx.fillStyle = color;
	  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	};
	
	Graphics.drawTile = function (tileSet, tileX, tileY, x, y, ctx) {
	  var tX = Math.floor(tileSet.tileWidth * tileX);
	  var tY = Math.floor(tileSet.tileHeight * tileY);
	  ctx.drawImage(tileSet.img, tX, tY, tileSet.tileWidth, tileSet.tileHeight, x, y, tileSet.tileWidth, tileSet.tileHeight);
	};
	
	Graphics.drawText = function (tileSet, text, x, y, ctx) {
	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .!?,\'":;_-+=/\\[]()#@%{}<>^*&~|→←↑↓○●$€¥'.split('');
	  var self = this;
	  if (x === 'center') {
	    x = Math.floor((ctx.canvas.width - text.length * (tileSet.tileWidth + 1)) / 2);
	  }
	  text.split('').forEach(function (char, i) {
	    var charIndex = chars.indexOf(char);
	    var charX = x + i * (tileSet.tileWidth + 1);
	    var charY = ['g', 'j', 'p', 'q', 'y'].indexOf(char) > -1 ? y + 2 : y;
	    self.drawTile(tileSet, charIndex, 0, charX, charY, ctx);
	  });
	};
	
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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Character = function () {
	  function Character(tiles, map) {
	    _classCallCheck(this, Character);
	
	    this.tiles = tiles;
	    this.map = map;
	    this.parts = {};
	    this.setRandomPart('rearHair');
	    this.setRandomPart('face');
	    this.setRandomPart('body');
	    this.setRandomPart('frontHair');
	    this.pos = { x: 30, y: 50 };
	    this.velocity = { x: 0, y: 0 };
	    this.acceleration = { x: 0, y: 0.0005 };
	    this.state = 'standing';
	    this.runFrame = 1;
	  }
	
	  _createClass(Character, [{
	    key: 'update',
	    value: function update(time) {
	      var footPos = this.state === 'running' ? 11 : 18;
	      var floorHeight = 117 - this.map.whatsHere(this.pos.x + footPos).height;
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
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics, ctx) {
	      var animFrame = 0;
	      if (this.state === 'running') {
	        animFrame = this.runFrame;
	      } else if (this.state === 'jumping') {
	        animFrame = 3;
	      } else if (this.state === 'falling') {
	        animFrame = 0;
	      }
	      graphics.drawTile(this.tiles.rearHair, this.parts.rearHair, 0, this.pos.x, this.pos.y, ctx);
	      graphics.drawTile(this.tiles.body, this.parts.body, animFrame, this.pos.x, this.pos.y, ctx);
	      graphics.drawTile(this.tiles.face, this.parts.face, 0, this.pos.x, this.pos.y, ctx);
	      graphics.drawTile(this.tiles.frontHair, this.parts.frontHair, 0, this.pos.x, this.pos.y, ctx);
	    }
	  }, {
	    key: 'jump',
	    value: function jump() {
	      if (this.velocity.y === 0) {
	        this.velocity.y = -0.24;
	      }
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
	
	    this.runTime = 0;
	    this.ticks = 0;
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
	        var delta = Math.min(frameTime, this.timeStep);
	        frameTime -= delta;
	        this.runTime += delta;
	        this.game.update({ delta: delta, ticks: this.ticks, runTime: this.runTime });
	      }
	      this.ticks++;
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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Map = function () {
	  function Map(tiles, mapstring) {
	    _classCallCheck(this, Map);
	
	    this.tiles = tiles;
	    this.stage = mapstring.split('');
	    this.x = 0;
	    this.clouds = [];
	    for (var c = 0; c < 20; c++) {
	      this.clouds.push(this._randomCloud());
	    }
	  }
	
	  _createClass(Map, [{
	    key: '_randomCloud',
	    value: function _randomCloud() {
	      return { x: (0, _utils.randomBetween)(-6, 160), y: (0, _utils.randomBetween)(0, 120), speed: (0, _utils.randomBetween)(0.05, 0.2) };
	    }
	  }, {
	    key: 'update',
	    value: function update(time) {
	      var _this = this;
	
	      this.x -= time.delta * 0.1;
	
	      this.clouds.forEach(function (cloud) {
	        if (cloud.x > -40) {
	          cloud.x -= time.delta * cloud.speed;
	        } else {
	          cloud.x = 160;
	          cloud.y = _this._randomCloud().y;
	          cloud.speed = _this._randomCloud().speed;
	        }
	      });
	    }
	  }, {
	    key: 'whatsHere',
	    value: function whatsHere(offset) {
	      var heights = [-100, 13, 29, 45, 61];
	      var index = Math.floor((-this.x + offset) / this.tiles.mapTiles.tileWidth);
	      var tile = this.stage[index];
	      return { height: heights[tile] };
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics, ctx) {
	      var _this2 = this;
	
	      var y = [128, 112, 96, 80, 68];
	      var GROUND = 0;
	      var COLUMN_ROOT = 1;
	      var COLUMN_MID = 2;
	      var COLUMN_TOP = 3;
	      var PLATFORM = 9;
	      var CLOUD_LEFT = 7;
	      var CLOUD_RIGHT = 8;
	      var leftmostTile = Math.floor(-this.x / this.tiles.mapTiles.tileWidth);
	      var rightmostTile = leftmostTile + 10;
	
	      this.clouds.forEach(function (cloud) {
	        graphics.drawTile(_this2.tiles.mapTiles, CLOUD_LEFT, 0, cloud.x, cloud.y, ctx);
	        graphics.drawTile(_this2.tiles.mapTiles, CLOUD_RIGHT, 0, cloud.x + 16, cloud.y, ctx);
	      });
	
	      this.stage.forEach(function (t, index) {
	        if (index < leftmostTile || index > rightmostTile) {
	          return;
	        }
	        var x = _this2.x + _this2.tiles.mapTiles.tileWidth * index;
	        switch (t) {
	          case '0':
	            break;
	          case '1':
	          case '2':
	          case '3':
	          case '4':
	            graphics.drawTile(_this2.tiles.mapTiles, PLATFORM, 0, x, y[t - 1], ctx);
	            break;
	        }
	      });
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
	
	var _create = __webpack_require__(9);
	
	var _create2 = _interopRequireDefault(_create);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TitleScreen = function (_Screen) {
	  _inherits(TitleScreen, _Screen);
	
	  function TitleScreen(game) {
	    _classCallCheck(this, TitleScreen);
	
	    return _possibleConstructorReturn(this, (TitleScreen.__proto__ || Object.getPrototypeOf(TitleScreen)).call(this, game));
	  }
	
	  _createClass(TitleScreen, [{
	    key: 'render',
	    value: function render(graphics, ctx) {
	      graphics.clearScreen(ctx, '#b4a56a');
	      graphics.drawText(this.game.assets.Tiles.font, 'Runjumpers', 'center', 30, ctx);
	      graphics.drawText(this.game.assets.Tiles.font, 'Press z to start', 'center', 90, ctx);
	    }
	  }, {
	    key: 'keydown',
	    value: function keydown(key) {
	      switch (key) {
	        case 'z':
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
	
	var _running = __webpack_require__(10);
	
	var _running2 = _interopRequireDefault(_running);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	    _this.character = new _character2.default(_this.game.assets.Tiles);
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
	    value: function render(graphics, ctx) {
	      graphics.clearScreen(ctx, '#b4a56a');
	      graphics.drawText(this.game.assets.Tiles.font, 'Create your Runjumper', 10, 10, ctx);
	      graphics.drawText(this.game.assets.Tiles.font, 'hair', 80, 30, ctx);
	      graphics.drawText(this.game.assets.Tiles.font, 'bangs', 80, 40, ctx);
	      graphics.drawText(this.game.assets.Tiles.font, 'face', 80, 50, ctx);
	      graphics.drawText(this.game.assets.Tiles.font, 'body', 80, 60, ctx);
	      graphics.drawText(this.game.assets.Tiles.font, 'RUN!', 80, 80, ctx);
	      if (this.selection < 4) {
	        graphics.drawText(this.game.assets.Tiles.font, '←      →', 70, this.selection * 10 + 30, ctx);
	      }
	      if (this.selection === 4 && this.blink) {
	        graphics.drawText(this.game.assets.Tiles.font, '[     ]', 70, 80, ctx);
	      }
	      this.character.render(graphics, ctx);
	    }
	  }, {
	    key: 'nextScreen',
	    value: function nextScreen() {
	      if (this.selection === 4) {
	        this.game.currentScreen = new _running2.default(this.game, this.character);
	      }
	    }
	  }, {
	    key: 'selectUp',
	    value: function selectUp() {
	      this.selection = Math.max(this.selection - 1, 0);
	    }
	  }, {
	    key: 'selectDown',
	    value: function selectDown() {
	      this.selection = Math.min(this.selection + 1, this.choices.length - 1);
	    }
	  }, {
	    key: 'setLeft',
	    value: function setLeft() {
	      if (this.selection < 4) {
	        this.character.setPrevPart(this.choices[this.selection]);
	      }
	    }
	  }, {
	    key: 'setRight',
	    value: function setRight() {
	      if (this.selection < 4) {
	        this.character.setNextPart(this.choices[this.selection]);
	      }
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
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var map01 = "111111110001111111111111111110002222222224444444000000011111111111111113311331133111111122211113333332222222224444444440000011111";
	
	var RunningScreen = function (_Screen) {
	  _inherits(RunningScreen, _Screen);
	
	  function RunningScreen(game, character) {
	    _classCallCheck(this, RunningScreen);
	
	    var _this = _possibleConstructorReturn(this, (RunningScreen.__proto__ || Object.getPrototypeOf(RunningScreen)).call(this, game));
	
	    _this.map = new _map2.default(_this.game.assets.Tiles, map01);
	    _this.character = character;
	    character.map = _this.map;
	    return _this;
	  }
	
	  _createClass(RunningScreen, [{
	    key: 'update',
	    value: function update(time) {
	      this.map.update(time);
	      this.character.update(time);
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics, ctx) {
	      graphics.clearScreen(ctx, '#b4a56a');
	      this.map.render(graphics, ctx);
	      this.character.render(graphics, ctx);
	    }
	  }, {
	    key: 'keydown',
	    value: function keydown(key) {
	      switch (key) {
	        case 'z':
	          this.character.jump();
	      }
	    }
	  }]);
	
	  return RunningScreen;
	}(_screen2.default);
	
	exports.default = RunningScreen;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map