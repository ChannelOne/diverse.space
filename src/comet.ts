import * as THREE from "three"
import {getRandomInt} from "./util"

export class Comet {

    private _isMain: boolean;
    private _mesh: THREE.Mesh;
    private _velocity: THREE.Vector3;

    constructor(isMain: boolean = true) {
        this._isMain = isMain;

        var geometry;
        var material;

        if (!this._isMain) {
            material = new THREE.MeshBasicMaterial({
                color: 12566463
            });
            geometry = new THREE.SphereBufferGeometry(0.65, 32, 16);
        } else {
            material = new THREE.MeshBasicMaterial();
            geometry = new THREE.SphereBufferGeometry(1, 32, 16);
        }

        this._mesh = new THREE.Mesh(geometry, material);
        if (this._isMain) {
            this._mesh.position.x = 30.15;
            this._mesh.position.y = 100.42;
            this._mesh.position.z = -135;
        } else {
            this._mesh.position.x = getRandomInt(-30, 60);
            this._mesh.position.y = getRandomInt(100, 130);
            this._mesh.position.z = getRandomInt(-135, -160);
        }

        this._velocity = <THREE.Vector3>{
            x: -1,
            y: -2.3,
            z: 0,
        }
    }

    get velocity() {
        return this._velocity;
    }

    get isMain() {
        return this._isMain;
    }

    getObject() : THREE.Object3D {
        return this._mesh;
    }

    update(deltaSeconds: number) {
        this._mesh.position.x += this._velocity.x * deltaSeconds;
        this._mesh.position.y += this._velocity.y * deltaSeconds;
        this._mesh.position.z += this._velocity.z * deltaSeconds;
    }

}
