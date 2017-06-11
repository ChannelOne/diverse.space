import {Circle, Vector2d} from "."

export class WObject {

    private _shape: Circle;
    private _speed: Vector2d;
    private _quality: number;

    constructor(shape: Circle, speed: Vector2d, quality: number) {
        this._shape = shape;
        this._speed = speed.clone();
        this._quality = quality;
    }

    paint(ctx: CanvasRenderingContext2D, width:number, height: number) {
        const scale = width / 42;
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.position.x * scale, this.position.y * scale, this.shape.radius * scale, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.moveTo(this.position.x * scale, this.position.y * scale);
        let target = this.position.add(this.speed);
        ctx.lineTo(target.x * scale, target.y * scale);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fillText("(" + this.position.x.toFixed(2) + "," + this.position.y.toFixed(2) + ")", 
            this.position.x * scale, this.position.y * scale);
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