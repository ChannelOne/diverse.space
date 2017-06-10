import {Vector2d, Object} from "./model"

const width = 42;
const height = 42;
const a_constant = 1;
const G = 0.001;

export class World {

    private _objects: Object[];

    constructor(object: Object[]) {
        this._objects = object;
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
        }).filter((value) => {
            return value.position.x >= -value.shape.radius &&
            value.position.y <= -value.shape.radius &&
            value.position.x  + value.shape.radius <= width &&
            value.position.y + value.shape.radius <= height;
        })
    }

}
