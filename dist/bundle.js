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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2d_1 = __webpack_require__(7);
exports.Vector2d = Vector2d_1.Vector2d;
var Rectangle_1 = __webpack_require__(6);
exports.Rectangle = Rectangle_1.Rectangle;
var Circle_1 = __webpack_require__(5);
exports.Circle = Circle_1.Circle;
var WObject_1 = __webpack_require__(8);
exports.WObject = WObject_1.WObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(0);
var Camera_1 = __webpack_require__(3);
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
        this._camera = new Camera_1.Camera;
        this._camera.position = new model_1.Vector2d(width / 2, height / 2);
        this._objects = [
            new model_1.WObject(new model_1.Circle(new model_1.Vector2d(21, 16), 0.45), new model_1.Vector2d(0.83, 0), 0.03),
            new model_1.WObject(new model_1.Circle(new model_1.Vector2d(21, 26), 0.45), new model_1.Vector2d(-0.83, 0), 0.03),
            new model_1.WObject(new model_1.Circle(new model_1.Vector2d(21, 23), 0.1), new model_1.Vector2d(1.256, 0), 0.01),
            new model_1.WObject(new model_1.Circle(new model_1.Vector2d(21, 33), 0.6), new model_1.Vector2d(-0.55, 0), 0.43),
            new model_1.WObject(new model_1.Circle(new model_1.Vector2d(21, 21), 0.85), new model_1.Vector2d(0, 0), 3000),
        ];
        /*
        for (let i = 0; i < totalNum; i++) {
            let _shape = new Circle(new Vector2d(randomFrom(0, 42), randomFrom(0, 42)), randomFrom(0, 1));
            let object = new WObject(_shape, new Vector2d(randomFrom(0, 1), randomFrom(0, 1)), randomFrom(100, 200));
            this._objects.push(object);
        }
        */
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
            return value !== null;
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
    World.prototype.paint = function (ctx, width, height, res) {
        var _this = this;
        var scale = width / 42 * this._camera.scale;
        var offsetPos = new model_1.Vector2d(width / 2, height / 2);
        var renderObject = this._objects.map(function (value) {
            var renderObj = value.clone();
            renderObj.position = renderObj.position.sub(_this._camera.position).multiply(scale).add(offsetPos);
            renderObj.shape.radius = renderObj.shape.radius * scale;
            return renderObj;
        }).forEach(function (value) {
            value.paint(ctx, res);
        });
    };
    Object.defineProperty(World.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    return World;
}());
exports.World = World;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VirtualScroller_1 = __webpack_require__(9);
exports.VirtualScroller = VirtualScroller_1.VirtualScroller;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Camera = (function () {
    function Camera() {
        this._scale = 1.2;
    }
    Object.defineProperty(Camera.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (val) {
            this._position = val.clone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (val) {
            this._scale = val;
        },
        enumerable: true,
        configurable: true
    });
    return Camera;
}());
exports.Camera = Camera;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = __webpack_require__(1);
var model_1 = __webpack_require__(0);
var view_1 = __webpack_require__(2);
var lastDate;
function RefreshFactory(elem, world, res) {
    return function () {
        var width = elem.width;
        var height = elem.height;
        var ctx = elem.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        var now = new Date();
        var deltaTime = (now.getTime() - lastDate.getTime()) / 1000;
        world.update(deltaTime);
        world.paint(ctx, width, height, res);
        lastDate = now;
    };
}
document.addEventListener("DOMContentLoaded", function (event) {
    var show_case = document.getElementById("showcase");
    var virtual_scroller_elem = document.getElementById("virtual-scroller");
    var my_canvas = document.getElementById("my-canvas");
    var star_image = document.getElementById("star-image");
    var resources = {
        star_image: star_image
    };
    var virtual_scroller = new view_1.VirtualScroller(virtual_scroller_elem);
    my_canvas.width = window.innerWidth;
    my_canvas.height = window.innerHeight;
    window.addEventListener("resize", function (evt) {
        my_canvas.width = window.innerWidth;
        my_canvas.height = window.innerHeight;
    });
    var world = new World_1.World();
    lastDate = new Date();
    var mousedown = false;
    var originPoint;
    virtual_scroller.onScroll(function (delta) {
        if (world.camera.scale > 0.1 || delta > 0) {
            world.camera.scale += delta * 0.001;
        }
    });
    my_canvas.addEventListener("mousedown", function (e) {
        mousedown = true;
        originPoint = new model_1.Vector2d(e.clientX, e.clientY);
        show_case.style.display = "none";
    });
    my_canvas.addEventListener("mousemove", (function (e) {
        if (!mousedown)
            return;
        var scale = my_canvas.width / 42 * world.camera.scale;
        var newPoint = new model_1.Vector2d(e.clientX, e.clientY);
        var deltaPoint = newPoint.sub(originPoint).divide(scale);
        world.camera.position = world.camera.position.sub(deltaPoint);
        originPoint = newPoint;
    }));
    my_canvas.addEventListener("mouseup", function (e) {
        mousedown = false;
        show_case.style.display = "block";
    });
    setInterval(RefreshFactory(my_canvas, world, resources), 40);
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var Circle = (function () {
    function Circle(pos, radius) {
        this._position = pos.clone();
        this._radius = radius;
    }
    Circle.prototype.clone = function () {
        return new Circle(this._position, this._radius);
    };
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
    Circle.prototype.getBoundingRect = function () {
        return new _1.Rectangle(this._position.x - this._radius, this._position.y - this._radius, this._position.x + this._radius, this._position.y + this._radius);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle = (function () {
    function Rectangle(x1, y1, x2, y2) {
        if (x1 === void 0) { x1 = 0; }
        if (y1 === void 0) { y1 = 0; }
        if (x2 === void 0) { x2 = 0; }
        if (y2 === void 0) { y2 = 0; }
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }
    Rectangle.prototype.clone = function () {
        return new Rectangle(this._x1, this._y1, this._x2, this._y2);
    };
    Rectangle.prototype.multiply = function (num) {
        return new Rectangle(this._x1 * num, this._y1 * num, this._x2 * num, this._y2 * num);
    };
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._x2 - this._x1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._y2 - this._y1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "x1", {
        get: function () {
            return this._x1;
        },
        set: function (val) {
            this._x1 = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y1", {
        get: function () {
            return this._y1;
        },
        set: function (val) {
            this._y1 = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "x2", {
        get: function () {
            return this._x2;
        },
        set: function (val) {
            this._x2 = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y2", {
        get: function () {
            return this._y2;
        },
        set: function (val) {
            this._y2 = val;
        },
        enumerable: true,
        configurable: true
    });
    return Rectangle;
}());
exports.Rectangle = Rectangle;


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var track_arr;
var WObject = (function () {
    function WObject(shape, speed, quality) {
        this._last_width = 0;
        this._shape = shape;
        this._speed = speed.clone();
        this._quality = quality;
        track_arr = [];
    }
    WObject.prototype.clone = function () {
        return new WObject(this._shape.clone(), this._speed.clone(), this._quality);
    };
    WObject.prototype.paint = function (ctx, res) {
        /*
        if (width !== this._last_width || width * height !== track_arr.length) {
            track_arr = [];
            track_arr.length = width * height;
            track_arr = track_arr.map(() => false);
            this._last_width = width;
        }
        */
        // const scale = width / 42;
        ctx.drawImage(res.star_image, this.position.x - this.shape.radius, this.position.y - this.shape.radius, this.shape.radius * 2, this.shape.radius * 2);
        /*
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
        */
        /*
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.moveTo(this.position.x, this.position.y);

        let target = this.position.add(this.speed);
        ctx.lineTo(target.x, target.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fillText("(" + this.position.x.toFixed(2) + "," + this.position.y.toFixed(2) + ")",
            this.position.x, this.position.y);
        */
        /*
        track_arr[Math.round(this.position.y * scale) * height + Math.round(this.position.x * scale)] = true;
        for (let i = 0; i < height; ++i)
            for (let j = 0; j < width; ++j) {
                if (track_arr[i * height + j]) {
                    ctx.fillStyle = "orange";
                    ctx.fillRect(j, i, 1, 1);
                    ctx.stroke();
                }
            }
            */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VirtualScroller = (function () {
    function VirtualScroller(con) {
        var _this = this;
        this._scroll_event_handlers = [];
        this._container = con;
        this._scroll_tain = document.querySelector(".scroll-train");
        this._content = document.querySelector(".scroll-container");
        this._container.appendChild(this._scroll_tain);
        this._scroll_tain.style.height = 1e6 + "px";
        this._last_top = this._container.scrollTop = 1e6 / 2;
        window.addEventListener("resize", function (e) {
            _this._content.style.width = window.innerWidth + "px";
            _this._content.style.height = window.innerHeight + "px";
        });
        this._content.style.width = window.innerWidth + "px";
        this._content.style.height = window.innerHeight + "px";
        setTimeout(function () {
            _this._container.addEventListener("scroll", function (e) { return _this.handleScroll(e); });
        }, 100);
        this.handleScroll(null);
    }
    VirtualScroller.prototype.onScroll = function (callback) {
        this._scroll_event_handlers.push(callback);
    };
    VirtualScroller.prototype.handleScroll = function (e) {
        // this._content.style.marginTop = this._container.scrollTop + "px";
        var delta = this._container.scrollTop - this._last_top;
        this._content.style.transform = "translateY(" + this._container.scrollTop + "px" + ")";
        this._scroll_event_handlers.forEach(function (v) { return v.call(undefined, delta); });
        this._last_top = this._container.scrollTop;
    };
    Object.defineProperty(VirtualScroller.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    return VirtualScroller;
}());
exports.VirtualScroller = VirtualScroller;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map