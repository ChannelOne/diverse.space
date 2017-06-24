import {Circle, Vector2d, Resources} from "."

let track_arr: boolean[];

export class WObject {

    private _shape: Circle;
    private _speed: Vector2d;
    private _quality: number;

    private _last_width = 0;

    constructor(shape: Circle, speed: Vector2d, quality: number) {
        this._shape = shape;
        this._speed = speed.clone();
        this._quality = quality;
        track_arr = []
    }

    clone() {
        return new WObject(this._shape.clone(), this._speed.clone(), this._quality);
    }

    paint(ctx: CanvasRenderingContext2D, res: Resources) {
        /*
        if (width !== this._last_width || width * height !== track_arr.length) {
            track_arr = [];
            track_arr.length = width * height;
            track_arr = track_arr.map(() => false);
            this._last_width = width;
        }
        */

        // const scale = width / 42;
        ctx.drawImage(res.star_image, this.position.x - this.shape.radius, this.position.y - this.shape.radius, 
            this.shape.radius * 2, this.shape.radius * 2);
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