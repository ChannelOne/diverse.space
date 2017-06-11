/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(5);
var width = 42;
var height = 42;
var a_constant = 1;
var G = 0.001;
function randomFrom(begin, end) {
    return (end - begin) * Math.random() + begin;
}
var World = (function () {
    function World() {
        this._objects = [];
        var totalNum = randomFrom(20, 70);
        for (var i = 0; i < totalNum; i++) {
            var _shape = new model_1.Circle(new model_1.Vector2d(randomFrom(0, 42), randomFrom(0, 42)), randomFrom(0, 2));
            var object = new model_1.WObject(_shape, new model_1.Vector2d(randomFrom(0, 1), randomFrom(0, 1)), randomFrom(100, 200));
            this._objects.push(object);
        }
    }
    World.prototype.update = function (deltaMS) {
        var _this = this;
        this._objects = this._objects.map(function (value) {
            var tmp_spd = value.speed;
            _this._objects.forEach(function (second) {
                if (second === value)
                    return;
                var delta = second.position.sub(value.position);
                var direction = delta.normalize();
                var ac = G * second.quality / delta.sqrLength();
                tmp_spd = tmp_spd.add(direction.multiply(ac * deltaMS));
            });
            value.speed = tmp_spd;
            value.position = value.position.add(value.speed.multiply(deltaMS));
            return value;
        }).filter(function (value) {
            return value.position.x >= -value.shape.radius &&
                value.position.y >= -value.shape.radius &&
                value.position.x + value.shape.radius <= width &&
                value.position.y + value.shape.radius <= height;
        }).filter(function (value) {
            return value.shape.radius > 0.01;
        });
        this.collision();
    };
    World.prototype.collision = function () {
        var result = [];
        for (var i = 0; i < this._objects.length; i++) {
            var value = this._objects[i];
            if (value === null)
                continue;
            var cflag = false;
            for (var j = 0; j < this._objects.length; j++) {
                var that = this._objects[j];
                if (value === that || that === null)
                    continue;
                var _result = value.shape.intersectWith(that.shape);
                if (_result !== null) {
                    cflag = true;
                    var direction = that.position.sub(value.position).normalize();
                    var position = direction.multiply(value.shape.radius).add(value.position);
                    var new_radius = Math.sqrt(Math.pow(value.shape.radius, 2) + Math.pow(that.shape.radius, 2));
                    var obj = new model_1.WObject(new model_1.Circle(position, new_radius), new model_1.Vector2d(0, 0), value.quality + that.quality);
                    result.push(obj);
                    this._objects[i] = null;
                    this._objects[j] = null;
                    break;
                }
            }
            if (!cflag) {
                result.push(value);
            }
        }
        this._objects = result;
    };
    World.prototype.paint = function (ctx, width, height) {
        this._objects.forEach(function (value) {
            value.paint(ctx, width, height);
        });
    };
    return World;
}());
exports.World = World;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = __webpack_require__(0);
var lastDate;
function RefreshFactory(elem, world) {
    return function () {
        var width = elem.width;
        var height = elem.height;
        var ctx = elem.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        var now = new Date();
        var deltaTime = (now.getTime() - lastDate.getTime()) / 1000;
        world.update(deltaTime);
        world.paint(ctx, width, height);
        lastDate = now;
    };
}
document.addEventListener("DOMContentLoaded", function (event) {
    var my_canvas = document.getElementById("my-canvas");
    my_canvas.width = window.innerWidth;
    my_canvas.height = window.innerHeight;
    window.addEventListener("resize", function (evt) {
        my_canvas.width = window.innerWidth;
        my_canvas.height = window.innerHeight;
    });
    var world = new World_1.World();
    lastDate = new Date();
    setInterval(RefreshFactory(my_canvas, world), 20);
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Circle = (function () {
    function Circle(pos, radius) {
        this._position = pos.clone();
        this._radius = radius;
    }
    Circle.prototype.intersectWith = function (that) {
        var deltaLen = that.position.sub(this._position).length();
        if (deltaLen >= this._radius + that._radius)
            return null;
        else {
            var _contain = false;
            if (deltaLen < Math.abs(this._radius - that._radius))
                _contain = true;
            return {
                contain: _contain,
                delta: this._radius + that._radius - deltaLen,
                positionDelta: that._position.sub(this._position),
            };
        }
    };
    Object.defineProperty(Circle.prototype, "position", {
        get: function () {
            return this._position.clone();
        },
        set: function (value) {
            this._position = value.clone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
        },
        enumerable: true,
        configurable: true
    });
    return Circle;
}());
exports.Circle = Circle;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2d = (function () {
    function Vector2d(x, y) {
        this._x = x;
        this._y = y;
    }
    Vector2d.prototype.add = function (that) {
        return new Vector2d(this._x + that._x, this._y + that._y);
    };
    Vector2d.prototype.sub = function (that) {
        return new Vector2d(this._x - that._x, this._y - that._y);
    };
    Vector2d.prototype.multiply = function (num) {
        return new Vector2d(this._x * num, this._y * num);
    };
    Vector2d.prototype.divide = function (num) {
        return new Vector2d(this._x / num, this._y / num);
    };
    Vector2d.prototype.dot = function (that) {
        return this._x * that._x + this._y * that._y;
    };
    Vector2d.prototype.sqrLength = function () {
        return this._x * this._x + this._y * this._y;
    };
    Vector2d.prototype.normalize = function () {
        return this.divide(this.length());
    };
    Vector2d.prototype.length = function () {
        return Math.sqrt(this.sqrLength());
    };
    Vector2d.prototype.clone = function () {
        return new Vector2d(this._x, this._y);
    };
    Object.defineProperty(Vector2d.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2d.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    return Vector2d;
}());
exports.Vector2d = Vector2d;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WObject = (function () {
    function WObject(shape, speed, quality) {
        this._shape = shape;
        this._speed = speed.clone();
        this._quality = quality;
    }
    WObject.prototype.paint = function (ctx, width, height) {
        var scale = width / 42;
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.position.x * scale, this.position.y * scale, this.shape.radius * scale, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.moveTo(this.position.x * scale, this.position.y * scale);
        var target = this.position.add(this.speed);
        ctx.lineTo(target.x * scale, target.y * scale);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fillText("(" + this.position.x.toFixed(2) + "," + this.position.y.toFixed(2) + ")", this.position.x * scale, this.position.y * scale);
    };
    Object.defineProperty(WObject.prototype, "position", {
        get: function () {
            return this._shape.position;
        },
        set: function (value) {
            this._shape.position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WObject.prototype, "shape", {
        get: function () {
            return this._shape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WObject.prototype, "speed", {
        get: function () {
            return this._speed.clone();
        },
        set: function (value) {
            this._speed = value.clone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WObject.prototype, "quality", {
        get: function () {
            return this._quality;
        },
        enumerable: true,
        configurable: true
    });
    return WObject;
}());
exports.WObject = WObject;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2d_1 = __webpack_require__(3);
exports.Vector2d = Vector2d_1.Vector2d;
var Circle_1 = __webpack_require__(2);
exports.Circle = Circle_1.Circle;
var WObject_1 = __webpack_require__(4);
exports.WObject = WObject_1.WObject;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map