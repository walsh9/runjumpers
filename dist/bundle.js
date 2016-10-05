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

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
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
	
	Graphics.drawTile = function (tileSet, tileX, tileY, x, y, ctx) {
	  var tX = Math.floor(tileSet.tileWidth * tileX);
	  var tY = Math.floor(tileSet.tileHeight * tileY);
	  ctx.drawImage(tileSet.img, tX, tY, tileSet.tileWidth, tileSet.tileHeight, x, y, tileSet.tileWidth, tileSet.tileHeight);
	};
	
	exports.default = Graphics;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _graphics = __webpack_require__(1);
	
	var _graphics2 = _interopRequireDefault(_graphics);
	
	var _character = __webpack_require__(3);
	
	var _character2 = _interopRequireDefault(_character);
	
	var _timer = __webpack_require__(4);
	
	var _timer2 = _interopRequireDefault(_timer);
	
	var _map = __webpack_require__(5);
	
	var _map2 = _interopRequireDefault(_map);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var map01 = "1121111111111211111000110111211131123111111113111110011011111000011111111113331111110000000000000000000";
	
	var Game = {
	  init: function init() {
	    this.map = new _map2.default(Assets.Tiles, map01);
	    this.character = new _character2.default(Assets.Tiles, this.map);
	  },
	  update: function update(time) {
	    this.map.update(time);
	    this.character.update(time);
	  },
	  render: function render() {
	    Gamestate.ctx.fillStyle = '#b4a56a';
	    Gamestate.ctx.fillRect(0, 0, Gamestate.ctx.canvas.width, Gamestate.ctx.canvas.height);
	    this.map.render(_graphics2.default, Gamestate.ctx);
	    this.character.render(_graphics2.default, Gamestate.ctx);
	  }
	};
	var gameTimer = new _timer2.default(Game, 1 / 60);
	
	var Gamestate = {};
	Gamestate.ctx = document.querySelector('canvas').getContext('2d');
	var Assets = {};
	Assets.Tiles = {};
	Promise.all([_graphics2.default.loadTileSet('i/ppl_rear_hair.png', 27, 27), _graphics2.default.loadTileSet('i/ppl_body.png', 27, 27), _graphics2.default.loadTileSet('i/ppl_face.png', 27, 27), _graphics2.default.loadTileSet('i/ppl_front_hair.png', 27, 27), _graphics2.default.loadTileSet('i/misc.png', 16, 16)]).then(function (tilesets) {
	  Assets.Tiles.rearHair = tilesets[0];
	  Assets.Tiles.body = tilesets[1];
	  Assets.Tiles.face = tilesets[2];
	  Assets.Tiles.frontHair = tilesets[3];
	  Assets.Tiles.mapTiles = tilesets[4];
	  gameTimer.start();
	});
	
	window.addEventListener('keydown', function (e) {
	  var key = e.key;
	  switch (key) {
	    case 'w':
	      Game.character.setNextPart('rearHair');
	      break;
	    case 'a':
	      Game.character.setNextPart('body');
	      break;
	    case 's':
	      Game.character.setNextPart('face');
	      break;
	    case 'd':
	      Game.character.setNextPart('frontHair');
	      break;
	    case 'z':
	      Game.character.jump();
	      break;
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	      var floorHeight = 117 - this.map.whatsHere(this.pos.x + 18).height;
	      if (this.pos.y < floorHeight || this.velocity.y < 0) {
	        if (this.velocity.y <= 0) {
	          this.state = 'jumping';
	        } else {
	          this.state = 'falling';
	        }
	        this.velocity.y += time.delta * this.acceleration.y;
	        this.pos.y += time.delta * this.velocity.y;
	      } else {
	        this.state = 'running';
	        this.velocity.y = 0;
	        this.pos.y = floorHeight;
	      }
	      this.runFrame = time.ticks % 8 < 4 ? 1 : 2;
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
	      console.log(this.pos, this.velocity);
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
	      this.parts[partName] = (this.parts[partName] + 1) % this.tiles[partName].tileColumns;
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
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Map = function () {
	  function Map(tiles, mapstring) {
	    _classCallCheck(this, Map);
	
	    this.tiles = tiles;
	    this.stage = mapstring.split('');
	    this.x = 0;
	  }
	
	  _createClass(Map, [{
	    key: 'update',
	    value: function update(time) {
	      this.x -= time.delta * 0.1;
	    }
	  }, {
	    key: 'whatsHere',
	    value: function whatsHere(offset) {
	      var heights = [-100, 10, 29, 45];
	      var index = Math.floor((-this.x + offset) / this.tiles.mapTiles.tileWidth);
	      var tile = this.stage[index];
	      return { height: heights[tile] };
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics, ctx) {
	      var _this = this;
	
	      var y = [128, 112, 96, 80, 68];
	      var GROUND = 0;
	      var COLUMN_ROOT = 1;
	      var COLUMN_MID = 2;
	      var COLUMN_TOP = 3;
	      this.stage.forEach(function (t, index) {
	        var x = _this.x + _this.tiles.mapTiles.tileWidth * index;
	        switch (t) {
	          case '0':
	            break;
	          case '1':
	            graphics.drawTile(_this.tiles.mapTiles, GROUND, 0, x, y[0], ctx);
	            break;
	          case '2':
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_ROOT, 0, x, y[0], ctx);
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_TOP, 0, x, y[1], ctx);
	            break;
	          case '3':
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_ROOT, 0, x, y[0], ctx);
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_MID, 0, x, y[1], ctx);
	            graphics.drawTile(_this.tiles.mapTiles, COLUMN_TOP, 0, x, y[2], ctx);
	            break;
	        }
	      });
	    }
	  }]);
	
	  return Map;
	}();
	
	exports.default = Map;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map