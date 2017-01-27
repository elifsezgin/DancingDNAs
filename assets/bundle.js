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

	'use strict';
	
	var _stage_view = __webpack_require__(1);
	
	var _stage_view2 = _interopRequireDefault(_stage_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	  var root = $('.dna-puzzle');
	  var view = new _stage_view2.default(root);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _stage = __webpack_require__(2);
	
	var _stage2 = _interopRequireDefault(_stage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StageView = function () {
	  function StageView($root) {
	    _classCallCheck(this, StageView);
	
	    this.$root = $root;
	    this.canvas = document.getElementById('3d-canvas');
	    this.dnaCount = 8;
	    this.mouse = new THREE.Vector2();
	    this.scene = new THREE.Scene();
	    this.camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000);
	    this.renderer = Detector.webgl ? new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true }) : new THREE.CanvasRenderer();
	    this.factor = 0;
	    this.$audio = $("audio");
	    this.$pause = $("<i class='fa fa-pause-circle' aria-hidden='true'></i>");
	    this.isFirst = true;
	
	    this.onMouseMove = this.onMouseMove.bind(this);
	    this.onWindowResize = this.onWindowResize.bind(this);
	    this.createHeaderButtons = this.createHeaderButtons.bind(this);
	    this.handleSwitch = this.handleSwitch.bind(this);
	    this.handleIncrease = this.handleIncrease.bind(this);
	    this.handleDecrease = this.handleDecrease.bind(this);
	    this.toggleHelp = this.toggleHelp.bind(this);
	
	    this.createHeaderButtons();
	    this.setStage();
	    this.$controls = $('.dg');
	    this.$controls[1].style.display = 'none';
	  }
	
	  _createClass(StageView, [{
	    key: 'setStage',
	    value: function setStage() {
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	      document.body.appendChild(this.renderer.domElement);
	      this.camera.position.z = 30;
	
	      var holders = [];
	      var stage = new _stage2.default(this.dnaCount, this.scene);
	
	      var _stage$startGame = stage.startGame();
	
	      var _stage$startGame2 = _slicedToArray(_stage$startGame, 2);
	
	      holders = _stage$startGame2[0];
	      this.scene = _stage$startGame2[1];
	
	
	      var CubeConfigData = function CubeConfigData() {
	        this.zoom = 20;
	      };
	
	      var view = new CubeConfigData();
	      var gui = new dat.GUI();
	      gui.close();
	
	      gui.add(view, 'zoom', 0, 20).onChange(function (value) {
	        this.camera.position.z = value;
	      });
	
	      window.addEventListener('mousemove', this.onMouseMove, false);
	      window.addEventListener('resize', this.onWindowResize, false);
	
	      this.$switch.on('click', this.handleSwitch);
	      this.$hint.on('click', this.toggleHelp);
	      this.$plus.on('click', this.handleIncrease);
	      this.$minus.on('click', this.handleDecrease);
	
	      var that = this;
	      var counter = that.dnaCount;
	      var render = function render() {
	        requestAnimationFrame(render);
	        for (var i = 0; i < counter; i++) {
	          holders[i].position.x = that.mouse.x * 30 * (i - counter / 2) * that.factor;
	          holders[i].position.y = that.mouse.y * that.factor;
	          holders[i].rotation.y += that.mouse.y * that.factor;
	          that.renderer.render(that.scene, that.camera);
	        }
	      };
	      render();
	    }
	  }, {
	    key: 'createHeaderButtons',
	    value: function createHeaderButtons() {
	      this.$switch = $('#music-circle');
	      this.$play = $('.fa-play-circle');
	      this.$hint = $('#question-circle');
	      this.$plus = $('#plus-circle');
	      this.$minus = $('#minus-circle');
	    }
	  }, {
	    key: 'handleIncrease',
	    value: function handleIncrease(e) {
	      if (this.$audio[0].muted === false) {
	        this.factor += 0.1;
	      }
	      e.stopImmediatePropagation();
	    }
	  }, {
	    key: 'handleDecrease',
	    value: function handleDecrease(e) {
	      if (this.factor !== 0) {
	        this.factor -= 0.1;
	      }
	      e.stopImmediatePropagation();
	    }
	  }, {
	    key: 'handleSwitch',
	    value: function handleSwitch(e) {
	      var $play = $('.play-pause');
	      if (this.$audio[0].muted === false) {
	        this.$audio[0].muted = true;
	        this.factor = 0;
	        this.$switch[0].children[0].remove();
	        this.$switch.append(this.$play);
	        $play[0].innerHTML = 'Play';
	      } else {
	        this.$audio[0].muted = false;
	        this.factor = 0.5;
	        this.$switch[0].children[0].remove();
	        this.$switch.append(this.$pause);
	        $play[0].innerHTML = 'Pause';
	        if (this.isFirst) {
	          this.toggleHelp(e);
	          this.isFirst = false;
	        }
	      }
	      e.stopImmediatePropagation();
	    }
	  }, {
	    key: 'toggleHelp',
	    value: function toggleHelp(e) {
	      var $help = $(".modal");
	      for (var i = 0; i < $help.length; i++) {
	        if ($help[i].style.display === 'none') {
	          $help[i].style.display = 'block';
	        } else {
	          $help[i].style.display = 'none';
	        }
	      }
	      e.stopImmediatePropagation();
	    }
	  }, {
	    key: 'onWindowResize',
	    value: function onWindowResize(e) {
	      var containerWidth = window.innerWidth;
	      var containerHeight = window.innerHeight;
	      this.renderer.setSize(containerWidth, containerHeight);
	      this.camera.aspect = containerWidth / containerHeight;
	      this.camera.updateProjectionMatrix();
	    }
	  }, {
	    key: 'onMouseMove',
	    value: function onMouseMove(e) {
	      this.mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
	      this.mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
	    }
	  }]);
	
	  return StageView;
	}();
	
	exports.default = StageView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dna = __webpack_require__(3);
	
	var _dna2 = _interopRequireDefault(_dna);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Stage = function () {
	  function Stage(totalDNACount, scene) {
	    _classCallCheck(this, Stage);
	
	    this.totalDNACount = totalDNACount;
	    this.scene = scene;
	  }
	
	  _createClass(Stage, [{
	    key: 'startGame',
	    value: function startGame() {
	      var holder = void 0;
	      var holders = [];
	      for (var i = 1; i <= this.totalDNACount; i++) {
	        var dnaCreater = new _dna2.default(-40, 15, this.scene);
	
	        var _dnaCreater$createDNA = dnaCreater.createDNA();
	
	        var _dnaCreater$createDNA2 = _slicedToArray(_dnaCreater$createDNA, 2);
	
	        holder = _dnaCreater$createDNA2[0];
	        this.scene = _dnaCreater$createDNA2[1];
	
	        holders.push(holder);
	      }
	      return [holders, this.scene];
	    }
	  }]);
	
	  return Stage;
	}();
	
	exports.default = Stage;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DNA = function () {
	  function DNA(positionY, length, scene) {
	    _classCallCheck(this, DNA);
	
	    this.positionY = positionY;
	    this.length = length;
	    this.scene = scene;
	  }
	
	  _createClass(DNA, [{
	    key: "createDNA",
	    value: function createDNA() {
	      var pink = 0xff8da1;
	      var yellow = 0xfff5c0;
	      var purple = 0xc0cbff;
	      var orange = 0xffb38d;
	      var green = 0xa1ff8d;
	      var gray = 0x33eee0;
	
	      var tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 12, 32);
	      var cubeGeometry = new THREE.CubeGeometry(6, 6, 32, 32);
	      var ballGeometry = new THREE.SphereGeometry(1.5, 32, 32);
	      var pinkMaterial = new THREE.MeshBasicMaterial({ color: pink });
	      var yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });
	      var purpleMaterial = new THREE.MeshBasicMaterial({ color: purple });
	      var orangeMaterial = new THREE.MeshBasicMaterial({ color: orange });
	      var greenMaterial = new THREE.MeshBasicMaterial({ color: green });
	      var grayMaterial = new THREE.MeshBasicMaterial({ color: gray });
	
	      var dna = new THREE.Object3D();
	      var holder = new THREE.Object3D();
	
	      var random = void 0;
	
	      for (var i = 0; i <= this.length; i++) {
	        var pinkTube = new THREE.Mesh(tubeGeometry, pinkMaterial);
	        pinkTube.rotation.z = 90 * Math.PI / 180;
	        pinkTube.position.x = -3;
	
	        var yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial);
	        yellowTube.rotation.z = 90 * Math.PI / 180;
	        yellowTube.position.x = 3;
	
	        var ballRight = void 0,
	            ballLeft = void 0,
	            rightBallMaterial = void 0,
	            leftBallMaterial = void 0,
	            cube = void 0;
	        random = Math.floor(Math.random() * this.length) % 4;
	
	        if (random === 0) {
	          rightBallMaterial = purpleMaterial;
	          leftBallMaterial = grayMaterial;
	        } else if (random === 1) {
	          rightBallMaterial = orangeMaterial;
	          leftBallMaterial = greenMaterial;
	        } else if (random === 2) {
	          rightBallMaterial = grayMaterial;
	          leftBallMaterial = purpleMaterial;
	        } else {
	          rightBallMaterial = greenMaterial;
	          leftBallMaterial = orangeMaterial;
	        }
	
	        ballRight = new THREE.Mesh(ballGeometry, rightBallMaterial);
	        ballLeft = new THREE.Mesh(ballGeometry, leftBallMaterial);
	
	        ballRight.position.x = 9;
	        ballLeft.position.x = -9;
	
	        var row = new THREE.Object3D();
	
	        row.add(pinkTube);
	        row.add(yellowTube);
	        row.add(ballRight);
	        row.add(ballLeft);
	
	        row.position.y = i * 6;
	        row.rotation.y = 20 * i * Math.PI / 180;
	
	        dna.add(row);
	      }
	      dna.position.y = this.positionY;
	      this.scene.add(dna);
	      dna.position.y = this.positionY;
	      holder.add(dna);
	      this.scene.add(holder);
	      return [holder, this.scene];
	    }
	  }]);
	
	  return DNA;
	}();
	
	exports.default = DNA;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map