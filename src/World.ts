import {Vector2d, Circle, IntersectResult, WObject, Resources} from "./model"
import {Camera} from "./Camera"

const width = 42;
const height = 42;
const a_constant = 1;
const G = 0.001;

function randomFrom(begin: number, end: number) {
    return (end - begin) * Math.random() + begin;
}

export class World {

    private _camera: Camera;
    private _objects: WObject[] = [];

    constructor() {
        let totalNum = randomFrom(20, 70);
        this._camera = new Camera;
        this._camera.position = new Vector2d(width / 2, height / 2);

        this._objects = [
            new WObject(new Circle(new Vector2d(21,16), 0.45), new Vector2d(0.83, 0), 0.03),
            new WObject(new Circle(new Vector2d(21,26), 0.45), new Vector2d(-0.83, 0), 0.03),
            new WObject(new Circle(new Vector2d(21,23), 0.1), new Vector2d(1.256, 0), 0.01),
            new WObject(new Circle(new Vector2d(21,33), 0.6), new Vector2d(-0.55, 0), 0.43),

            new WObject(new Circle(new Vector2d(21,21), 0.85), new Vector2d(0, 0), 3000),
        ];
        /*
        for (let i = 0; i < totalNum; i++) {
            let _shape = new Circle(new Vector2d(randomFrom(0, 42), randomFrom(0, 42)), randomFrom(0, 1));
            let object = new WObject(_shape, new Vector2d(randomFrom(0, 1), randomFrom(0, 1)), randomFrom(100, 200));
            this._objects.push(object);
        }
        */
    }

    update(deltaMS: number) {
        this._objects = this._objects.map((value) => {
            let tmp_spd = value.speed;
            this._objects.forEach((second) => {
                if (second === value) return;
                const delta = second.position.sub(value.position);
                const direction = delta.normalize();
                const ac = G * second.quality / delta.sqrLength();
                tmp_spd = tmp_spd.add(direction.multiply(ac * deltaMS));
            })
            value.speed = tmp_spd;
            value.position = value.position.add(value.speed.multiply(deltaMS));
            return value;
        }).filter((value)=> {
            return value !== null;
        }).filter((value) => {
            return value.position.x >= -value.shape.radius &&
            value.position.y >= -value.shape.radius &&
            value.position.x  + value.shape.radius <= width &&
            value.position.y + value.shape.radius <= height;
        }).filter((value) => {
            return value.shape.radius > 0.01;
        });

        this.collision();
    }

    collision() {
        let result: WObject[] = [];
        for (let i = 0; i < this._objects.length; i++) {
            let value = this._objects[i];
            if (value === null) continue;

            let cflag = false;
            for (let j = 0; j < this._objects.length; j++) {
                let that = this._objects[j];
                if (value === that || that === null) continue;

                let _result = value.shape.intersectWith(that.shape);
                if (_result !== null) {
                    cflag = true;
                    let direction = that.position.sub(value.position).normalize();
                    let position = direction.multiply(value.shape.radius).add(value.position);
                    let new_radius = Math.sqrt(Math.pow(value.shape.radius, 2) + Math.pow(that.shape.radius, 2));
                    let obj = new WObject(new Circle(position, new_radius), 
                        new Vector2d(0, 0), value.quality + that.quality);
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
    }

    paint(ctx: CanvasRenderingContext2D, width: number, height: number, res: Resources) {
        const scale = width / 42 * this._camera.scale;
        const offsetPos = new Vector2d(width / 2, height / 2);

        let renderObject = this._objects.map((value) => {
            let renderObj = value.clone();
            renderObj.position = renderObj.position.sub(this._camera.position).multiply(scale).add(offsetPos);
            renderObj.shape.radius = renderObj.shape.radius * scale;
            return renderObj;
        }).forEach((value) => {
            value.paint(ctx, res);
        });
    }

    get camera() {
        return this._camera;
    }

}
