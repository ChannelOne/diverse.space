import * as THREE from "three"
import {Comet} from "./comet"
import {Trace} from "./trace"

export class MyScene {

    protected _scene: THREE.Scene;
    protected _camera: THREE.PerspectiveCamera;
    protected _renderer: THREE.WebGLRenderer; 

    private _comet: Comet;
    private _last_time: Date;
    private _traces: Trace[] = [];

    constructor() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(36.88, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._camera.rotation.x = THREE.Math.degToRad(2.0);
        this._camera.position.x = 0;
        this._camera.position.y = 13;
        this._camera.position.z = 54.82;

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight)

        this.addSphere();
        this.loadImage(1);
        this.loadImage(2);
        this.loadImage(3);
        this.addLight();

        this._comet = new Comet();
        this._scene.add(this._comet.getObject());

        this._last_time = new Date();

        setTimeout(() => {
            this.render();
        }, 5);
    }

    private addSphere() {
        var geometry = new THREE.SphereBufferGeometry(200, 32, 16);
        var material = new THREE.MeshStandardMaterial({
            color: 2117057,
            roughness: 0.8,
            metalness: 0.28,
        });
        material.side = THREE.BackSide;
        material.shading = THREE.SmoothShading;

        var mesh = new THREE.Mesh(geometry, material);
        this._scene.add(mesh);
    }

    private loadImage(index: number) {
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/cloud-" + index + ".png",  (texture: THREE.Texture) => {
            var geometry = new THREE.PlaneBufferGeometry(96, 20);
            var material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.46,
                metalness: 0,
                alphaTest: 0.74,
            });
            material.opacity = 0.8;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = (index - 1) * -20;
            this._scene.add(mesh);
        });
    }

    private addPlane(z: number) {
        var geometry = new THREE.PlaneBufferGeometry(170, 40);
        var material = new THREE.MeshStandardMaterial({
            color: 487550,
            roughness: 0.46,
            metalness: 0,
        })

        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = z;
        this._scene.add(mesh);
    }

    private addLight() {
        var pointLight = new THREE.PointLight();
        pointLight.position.x = 0;
        pointLight.position.y = 150;
        pointLight.position.z = 37.22;
        pointLight.intensity =  2.4;
        pointLight.decay = 1;

        this._scene.add(pointLight);
    }

    appendTo(elem: HTMLElement) {
        elem.appendChild(this._renderer.domElement);
    }

    private _countDelta = 0;

    render() {
        window.requestAnimationFrame(() => {
            this.render();
        });

        var currentDate = new Date();
        var delta = (currentDate.getTime() - this._last_time.getTime()) * 0.001;
        this._last_time = currentDate;

        if (this._countDelta > 1) {
            var trace = new Trace(this._comet.getObject().position);
            this._traces.push(trace);
            this._scene.add(trace.getObject());
            this._countDelta = 0;
        } else {
            this._traces.forEach((t: Trace) => {
                t.update(delta);
            })
            this._countDelta += delta;
        }
        
        this._comet.update(delta);
        this._renderer.render(this._scene, this._camera);
    }

}
