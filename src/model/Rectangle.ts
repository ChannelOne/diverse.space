
export class Rectangle {

    private _x1: number;
    private _y1: number;
    private _x2: number;
    private _y2: number;

    constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    clone() {
        return new Rectangle(this._x1, this._y1, this._x2, this._y2);
    }

    multiply(num: number) {
        return new Rectangle(this._x1 * num, this._y1 * num,
        this._x2 * num, this._y2 * num);
    }

    get width() {
        return this._x2 - this._x1;
    }

    get height() {
        return this._y2 - this._y1;
    }

    get x1() {
        return this._x1;
    }

    set x1(val) {
        this._x1 = val;
    }

    get y1() {
        return this._y1;
    }

    set y1(val) {
        this._y1 = val;
    }

    get x2() {
        return this._x2;
    }

    set x2(val) {
        this._x2 = val;
    }

    get y2() {
        return this._y2;
    }

    set y2(val) {
        this._y2 = val;
    }

}
