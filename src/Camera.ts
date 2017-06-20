import {Vector2d, WObject} from "./model"

export class Camera {

    private _position: Vector2d
    private _scale: number = 1.2

    get position() {
        return this._position;
    }

    set position(val: Vector2d) {
        this._position = val.clone();
    }

    get scale() {
        return this._scale;
    }

    set scale(val: number) {
        this._scale = val;
    }

}
