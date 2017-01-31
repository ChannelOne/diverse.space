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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRandomInt = getRandomInt;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var comet_1 = __webpack_require__(4);
var trace_1 = __webpack_require__(6);
var cloud_1 = __webpack_require__(3);
var halo_1 = __webpack_require__(5);
var util_1 = __webpack_require__(1);
var MyScene = (function () {
    function MyScene() {
        var _this = this;
        this._comets = [];
        this._traces = [];
        this._staticRotationX = THREE.Math.degToRad(2.0);
        this._countDelta = 0;
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(36.88, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._camera.rotation.x = this._staticRotationX;
        this._camera.position.x = 0;
        this._camera.position.y = 13;
        this._camera.position.z = 54.82;
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this.addSphere();
        this._cloud = new cloud_1.Cloud(function (meshes) {
            meshes.forEach(function (mesh) {
                _this._scene.add(mesh);
            });
        });
        this._halo = new halo_1.Halo(function (mesh) {
            _this._scene.add(mesh);
            _this.addLight();
        });
        var _comet;
        var _count = util_1.getRandomInt(5, 10);
        for (var i = 0; i < _count; i++) {
            if (i === 0) {
                _comet = new comet_1.Comet(true);
            }
            else {
                _comet = new comet_1.Comet(false);
            }
            this._comets.push(_comet);
            this._scene.add(_comet.getObject());
        }
        this._last_time = new Date();
        this.addBackground();
        window.addEventListener("mousemove", function (e) {
            _this.handleMouseMove(e);
        });
        setTimeout(function () {
            _this.render();
        }, 5);
    }
    MyScene.prototype.handleMouseMove = function (e) {
        var centerPoint = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        var mousePoint = {
            x: e.screenX,
            y: e.screenY,
        };
        var vector = {
            x: mousePoint.x - centerPoint.x,
            y: mousePoint.y - centerPoint.y,
        };
        this._camera.rotation.x = this._staticRotationX + vector.y / window.innerHeight * 0.025;
        this._camera.rotation.y = vector.x / window.innerWidth * 0.025;
    };
    MyScene.prototype.addSphere = function () {
        // var geometry = new THREE.SphereBufferGeometry(300, 32, 16);
        var geometry = new THREE.BoxBufferGeometry(1000, 500, 500);
        var material = new THREE.MeshStandardMaterial({
            color: 2712982,
            roughness: 0.86,
            metalness: 0.66,
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
            var geometry = new THREE.PlaneBufferGeometry(120, 15);
            var material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.46,
                metalness: 0,
                alphaTest: 0.2,
                blending: THREE.AdditiveBlending,
            });
            material.opacity = 0.8;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = (index - 1) * -15;
            _this._scene.add(mesh);
        });
    };
    MyScene.prototype.addBackground = function () {
        var _this = this;
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/cloud-t1.png", function (texture) {
            var geometry = new THREE.PlaneBufferGeometry(1200, 230);
            var material = new THREE.MeshStandardMaterial({
                map: texture,
                blending: THREE.AdditiveBlending,
                transparent: true
            });
            material.opacity = 0.75;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = 10;
            mesh.position.z = -185;
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
        pointLight.position.y = 80;
        pointLight.position.z = 50.22;
        pointLight.intensity = 1;
        pointLight.decay = 1;
        var sunLight = new THREE.SpotLight();
        sunLight.position.x = 0;
        sunLight.position.y = 15;
        sunLight.position.z = 180;
        sunLight.intensity = 0.38;
        sunLight.penumbra = 0.55;
        sunLight.angle = 0.220;
        sunLight.target = this._halo.getObjects();
        this._scene.add(pointLight);
        this._scene.add(sunLight);
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
            this._comets.forEach(function (comet) {
                var trace = new trace_1.Trace(comet.getObject().position, comet.isMain);
                _this._traces.push(trace);
                _this._scene.add(trace.getObject());
            });
            this._countDelta = 0;
        }
        else {
            var indexToRemove = [];
            this._traces.forEach(function (t, index) {
                t.update(delta);
                if (t.getObject().position.y < -10) {
                    indexToRemove.push(index);
                }
            });
            for (var i = indexToRemove.length - 1; i >= 0; i--) {
                var toRemove = indexToRemove[i];
                this._scene.remove(this._traces[toRemove].getObject());
                this._traces.splice(toRemove, 1);
            }
            this._countDelta += delta;
        }
        this._cloud.update(delta);
        this._comets.forEach(function (comet) {
            comet.update(delta);
        });
        this._renderer.render(this._scene, this._camera);
    };
    return MyScene;
}());
exports.MyScene = MyScene;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var Cloud = (function () {
    function Cloud(callback) {
        this._mashes = [];
        this._textures = [];
        this.loadImage(1);
        this.loadImage(2);
        this.loadImage(3);
        this._callback = callback;
    }
    Cloud.prototype.loadOne = function () {
        if (this._textures.length === 3) {
            this.allTextureLoaded();
        }
    };
    Cloud.prototype.loadImage = function (index) {
        var _this = this;
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/cloud-" + index + ".png", function (texture) {
            _this._textures.push(texture);
            _this.loadOne();
        });
    };
    Cloud.prototype.allTextureLoaded = function () {
        for (var i = 0; i < 20; i++) {
            var zPos = i * -15;
            for (var j = 0; j < 5; j++) {
                var geometry = new THREE.PlaneBufferGeometry(120, 15);
                var material = new THREE.MeshStandardMaterial({
                    map: this._textures[util_1.getRandomInt(0, 2)],
                    roughness: 0.46,
                    metalness: 0,
                    alphaTest: 0.2,
                    blending: THREE.AdditiveBlending,
                });
                material.opacity = 0.8;
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.z = zPos + j * 2;
                mesh.position.x = util_1.getRandomInt(-100, 100);
                this._mashes.push(mesh);
            }
        }
        if (this._callback) {
            this._callback(this._mashes);
        }
    };
    Cloud.prototype.getObjects = function () {
        return [];
    };
    Cloud.prototype.update = function (deltaSeconds) {
    };
    return Cloud;
}());
exports.Cloud = Cloud;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var Comet = (function () {
    function Comet(isMain) {
        if (isMain === void 0) { isMain = true; }
        this._isMain = isMain;
        var geometry;
        var material;
        if (!this._isMain) {
            material = new THREE.MeshBasicMaterial({
                color: 12566463
            });
            geometry = new THREE.SphereBufferGeometry(0.65, 32, 16);
        }
        else {
            material = new THREE.MeshBasicMaterial();
            geometry = new THREE.SphereBufferGeometry(1, 32, 16);
        }
        this._mesh = new THREE.Mesh(geometry, material);
        if (this._isMain) {
            this._mesh.position.x = 30.15;
            this._mesh.position.y = 100.42;
            this._mesh.position.z = -135;
        }
        else {
            this._mesh.position.x = util_1.getRandomInt(-30, 60);
            this._mesh.position.y = util_1.getRandomInt(100, 130);
            this._mesh.position.z = util_1.getRandomInt(-135, -160);
        }
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
    Object.defineProperty(Comet.prototype, "isMain", {
        get: function () {
            return this._isMain;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var Halo = (function () {
    function Halo(callback) {
        var _this = this;
        this._mesh = null;
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/halo.png", function (texture) {
            _this._texture = texture;
            // var geo = new THREE.PlaneBufferGeometry(88, 88);
            var geo = new THREE.CircleBufferGeometry(88, 64, 16);
            var material = new THREE.MeshStandardMaterial({
                map: _this._texture,
                blending: THREE.AdditiveBlending,
                opacity: 0.52,
                transparent: true,
                alphaTest: 0
            });
            _this._mesh = new THREE.Mesh(geo, material);
            _this._mesh.position.x = -43.37;
            _this._mesh.position.y = 15;
            _this._mesh.position.z = -180;
            if (callback) {
                callback(_this._mesh);
            }
        });
    }
    Halo.prototype.getObjects = function () {
        return this._mesh;
    };
    Halo.prototype.update = function (deltaSeconds) {
    };
    return Halo;
}());
exports.Halo = Halo;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var THREE = __webpack_require__(0);
var Trace = (function () {
    function Trace(pos, _isMain) {
        if (_isMain === void 0) { _isMain = true; }
        this._isMain = _isMain;
        this._velocity = {
            x: -1 * 0.5,
            y: -2.3 * 0.5,
            z: 0 * 0.5,
        };
        var geometry = new THREE.PlaneBufferGeometry(0.8, 10);
        if (this._isMain) {
            var material = new THREE.MeshBasicMaterial();
        }
        else {
            var material = new THREE.MeshBasicMaterial({
                color: 12566463
            });
        }
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var myScene_1 = __webpack_require__(2);
var container = document.getElementById("my-canvas");
var audioElem;
function init() {
    new myScene_1.MyScene().appendTo(container);
    audioElem = document.createElement("audio");
    var source = document.createElement("source");
    source.type = "audio/mpeg";
    source.src = "/assets/audios/bgm.mp3";
    audioElem.appendChild(source);
    document.body.appendChild(audioElem);
    audioElem.play();
}
window.addEventListener("resize", function (e) {
    document.body.removeChild(audioElem);
    audioElem = null;
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    init();
});
init();


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map