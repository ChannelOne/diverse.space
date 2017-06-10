import {Circle, Vector2d} from "."

export class Object {

    private _shape: Circle;
    private _speed: Vector2d;
    private _quality: number;

    constructor(shape: Circle, speed: Vector2d, quality: number) {
        this._shape = shape;
        this._speed = speed.clone();
        this._quality = quality;
    }

    set position(value: Vector2d) {
        this._shape.position = value;
    }

    get position() {
        return this._shape.position;
    }

    get shape() {
        return this._shape;
    }

    get speed() {
        return this._speed.clone();
    }

    set speed(value) {
        this._speed = value.clone();
    }

    get quality() {
        return this._quality;
    }

}