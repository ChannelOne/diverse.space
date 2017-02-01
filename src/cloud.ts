import * as THREE from "three"
import {getRandomInt} from "./util"

export class Cloud {

    private _mashes: THREE.Mesh[] = [];
    private _textures: THREE.Texture[] = [];
    private _callback: (meshes: THREE.Object3D[]) => void;

    constructor(callback?: (meshes: THREE.Object3D[]) => void) {
        this.loadImage(1);
        this.loadImage(2);
        this.loadImage(3);

        this._callback = callback;
    }

    private loadOne() {
        if (this._textures.length === 3) {
            this.allTextureLoaded();
        }
    }

    private loadImage(index: number) {
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/cloud-" + index + ".png",  (texture: THREE.Texture) => {
            this._textures.push(texture);
            this.loadOne();
        });
    }

    private allTextureLoaded() {
        for (var i = 0; i < 22; i++) {
            let zPos = i * -45;

            for (var j = 0; j < 42; j++) {
                var geometry = new THREE.PlaneBufferGeometry(120, 15);
                var material = new THREE.MeshStandardMaterial({
                    map: this._textures[getRandomInt(0, 2)],
                    roughness: 0.46,
                    metalness: 0,
                    alphaTest: 0.2,
                    blending: THREE.AdditiveBlending,
                });
                material.opacity = 0.8;
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.z = zPos + j * 1;
                mesh.position.x = getRandomInt(-390, -10);
                this._mashes.push(mesh);
            }

            for (var j = 0; j < 42; j++) {
                var geometry = new THREE.PlaneBufferGeometry(120, 15);
                var material = new THREE.MeshStandardMaterial({
                    map: this._textures[getRandomInt(0, 2)],
                    roughness: 0.46,
                    metalness: 0,
                    alphaTest: 0.2,
                    blending: THREE.AdditiveBlending,
                });
                material.opacity = 0.8;
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.z = zPos + j * 1;
                mesh.position.x = getRandomInt(0, 390);
                this._mashes.push(mesh);
            }
        }

        if (this._callback) {
            this._callback(this._mashes);
        }
    }

    getObjects(): THREE.Object3D[] {
        return [];
    }

    update(deltaSeconds: number) {

    }

}
