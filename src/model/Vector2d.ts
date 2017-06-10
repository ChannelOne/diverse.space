
export class Vector2d {

    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    add(that: Vector2d) {
        return new Vector2d(this._x + that._x, this._y + that._y);
    }

    sub(that: Vector2d) {
        return new Vector2d(this._x - that._x, this._y - that._y);
    }

    multiply(num: number) {
        return new Vector2d(this._x * num, this._y * num);
    }

    divide(num: number) {
        return new Vector2d(this._x / num, this._y / num);
    }

    dot(that: Vector2d) {
        return this._x * that._x + this._y * that._y;
    }

    sqrLength() : number {
        return this._x * this._x + this._y * this._y;
    }

    normalize(): Vector2d {
        return this.divide(this.length());
    }

    length() {
        return Math.sqrt(this.sqrLength());
    }

    clone() {
        return new Vector2d(this._x, this._y);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

}
