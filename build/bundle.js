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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var comet_1 = __webpack_require__(2);
var trace_1 = __webpack_require__(3);
var MyScene = (function () {
    function MyScene() {
        var _this = this;
        this._traces = [];
        this._countDelta = 0;
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(36.88, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._camera.rotation.x = THREE.Math.degToRad(2.0);
        this._camera.position.x = 0;
        this._camera.position.y = 13;
        this._camera.position.z = 54.82;
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this.addSphere();
        this.loadImage(1);
        this.loadImage(2);
        this.loadImage(3);
        this.addLight();
        this._comet = new comet_1.Comet();
        this._scene.add(this._comet.getObject());
        this._last_time = new Date();
        setTimeout(function () {
            _this.render();
        }, 5);
    }
    MyScene.prototype.addSphere = function () {
        var geometry = new THREE.SphereBufferGeometry(200, 32, 16);
        var material = new THREE.MeshStandardMaterial({
            color: 2117057,
            roughness: 0.8,
            metalness: 0.28,
        });
        material.side = THREE.BackSide;
        material.shading = THREE.SmoothShading;
        var mesh = new THREE.Mesh(geometry, material);
        this._scene.add(mesh);
    };
    MyScene.prototype.loadImage = function (index) {
        var _this = this;
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/cloud-" + index + ".png", function (texture) {
            var geometry = new THREE.PlaneBufferGeometry(96, 20);
            var material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.46,
                metalness: 0,
                alphaTest: 0.74,
            });
            material.opacity = 0.8;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = (index - 1) * -20;
            _this._scene.add(mesh);
        });
    };
    MyScene.prototype.addPlane = function (z) {
        var geometry = new THREE.PlaneBufferGeometry(170, 40);
        var material = new THREE.MeshStandardMaterial({
            color: 487550,
            roughness: 0.46,
            metalness: 0,
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = z;
        this._scene.add(mesh);
    };
    MyScene.prototype.addLight = function () {
        var pointLight = new THREE.PointLight();
        pointLight.position.x = 0;
        pointLight.position.y = 150;
        pointLight.position.z = 37.22;
        pointLight.intensity = 2.4;
        pointLight.decay = 1;
        this._scene.add(pointLight);
    };
    MyScene.prototype.appendTo = function (elem) {
        elem.appendChild(this._renderer.domElement);
    };
    MyScene.prototype.render = function () {
        var _this = this;
        window.requestAnimationFrame(function () {
            _this.render();
        });
        var currentDate = new Date();
        var delta = (currentDate.getTime() - this._last_time.getTime()) * 0.001;
        this._last_time = currentDate;
        if (this._countDelta > 1) {
            var trace = new trace_1.Trace(this._comet.getObject().position);
            this._traces.push(trace);
            this._scene.add(trace.getObject());
            this._countDelta = 0;
        }
        else {
            this._traces.forEach(function (t) {
                t.update(delta);
            });
            this._countDelta += delta;
        }
        this._comet.update(delta);
        this._renderer.render(this._scene, this._camera);
    };
    return MyScene;
}());
exports.MyScene = MyScene;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var Comet = (function () {
    function Comet() {
        var geometry = new THREE.SphereBufferGeometry(1, 32, 16);
        var material = new THREE.MeshBasicMaterial();
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.x = 30.15;
        this._mesh.position.y = 70.42;
        this._mesh.position.z = -135;
        this._velocity = {
            x: -1,
            y: -2.3,
            z: 0,
        };
    }
    Object.defineProperty(Comet.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        enumerable: true,
        configurable: true
    });
    Comet.prototype.getObject = function () {
        return this._mesh;
    };
    Comet.prototype.update = function (deltaSeconds) {
        this._mesh.position.x += this._velocity.x * deltaSeconds;
        this._mesh.position.y += this._velocity.y * deltaSeconds;
        this._mesh.position.z += this._velocity.z * deltaSeconds;
    };
    return Comet;
}());
exports.Comet = Comet;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var Trace = (function () {
    function Trace(pos) {
        this._velocity = {
            x: -1 * 0.5,
            y: -2.3 * 0.5,
            z: 0 * 0.5,
        };
        var geometry = new THREE.PlaneBufferGeometry(1, 10);
        var material = new THREE.MeshBasicMaterial();
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.x = pos.x - this._velocity.x * 5;
        this._mesh.position.y = pos.y - this._velocity.y * 5;
        this._mesh.position.z = pos.z - this._velocity.z * 5;
        this._mesh.rotation.z = Math.atan2(this._velocity.y, this._velocity.x) + Math.PI / 2;
    }
    Trace.prototype.getObject = function () {
        return this._mesh;
    };
    Trace.prototype.update = function (deltaSeconds) {
        this._mesh.position.x += this._velocity.x * deltaSeconds;
        this._mesh.position.y += this._velocity.y * deltaSeconds;
        this._mesh.position.z += this._velocity.z * deltaSeconds;
    };
    return Trace;
}());
exports.Trace = Trace;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var myScene_1 = __webpack_require__(1);
new myScene_1.MyScene().appendTo(document.body);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map