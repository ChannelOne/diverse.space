import {Vector2d, Rectangle, IntersectResult} from "."

export class Circle {

    private _position: Vector2d;
    private _radius: number;

    constructor(pos: Vector2d, radius: number) {
        this._position = pos.clone();
        this._radius = radius;
    }

    clone() {
        return new Circle(this._position, this._radius);
    }

    intersectWith(that: Circle): IntersectResult {
        let deltaLen = that.position.sub(this._position).length();
        if (deltaLen >= this._radius + that._radius) return null;
        else {
            let _contain = false;
            if (deltaLen < Math.abs(this._radius - that._radius)) _contain = true;
            return {
                contain: _contain,
                delta: this._radius + that._radius - deltaLen,
                positionDelta: that._position.sub(this._position),
            };
        }
    }

    getBoundingRect() {
        return new Rectangle(this._position.x - this._radius, this._position.y - this._radius,
            this._position.x + this._radius, this._position.y + this._radius);
    }

    set position(value: Vector2d) {
        this._position = value.clone();
    }

    get position() {
        return this._position.clone();
    }

    set radius(value: number) {
        this._radius = value;
    }

    get radius() {
        return this._radius;
    }

}
