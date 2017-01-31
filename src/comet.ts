import * as THREE from "three"

export class Comet {

    private _mesh: THREE.Mesh;
    private _velocity: THREE.Vector3;

    constructor() {
        var geometry = new THREE.SphereBufferGeometry(1, 32, 16);
        var material = new THREE.MeshBasicMaterial();

        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.x = 30.15;
        this._mesh.position.y = 70.42;
        this._mesh.position.z = -135;

        this._velocity = <THREE.Vector3>{
            x: -1,
            y: -2.3,
            z: 0,
        }
    }

    get velocity() {
        return this._velocity;
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
