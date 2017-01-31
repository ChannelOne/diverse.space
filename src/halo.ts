import * as THREE from "three"

export class Halo {

    private _texture: THREE.Texture;
    private _mesh: THREE.Mesh = null;

    constructor(callback?: (mesh: THREE.Object3D) => void) {
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/halo.png",  (texture: THREE.Texture) => {
            this._texture = texture;

            // var geo = new THREE.PlaneBufferGeometry(88, 88);
            var geo = new THREE.CircleBufferGeometry(88, 64, 16);
            var material = new THREE.MeshStandardMaterial({
                map: this._texture,
                blending: THREE.AdditiveBlending,
                opacity: 0.52,
                transparent: true,
                alphaTest: 0
            });
            this._mesh = new THREE.Mesh(geo, material);
            this._mesh.position.x = -43.37;
            this._mesh.position.y = 15;
            this._mesh.position.z = -180;

            if (callback) {
                callback(this._mesh);
            }
        });
    }

    getObjects() : THREE.Object3D {
        return this._mesh
    }

    update(deltaSeconds: number) {

    }

}
