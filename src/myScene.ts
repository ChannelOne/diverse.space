import * as THREE from "three"
import {Comet} from "./comet"
import {Trace} from "./trace"
import {Cloud} from "./cloud"
import {Halo} from "./halo"
import {getRandomInt} from "./util"

export class MyScene {

    protected _scene: THREE.Scene;
    protected _camera: THREE.PerspectiveCamera;
    protected _renderer: THREE.WebGLRenderer; 

    private _comets: Comet[] = [];
    private _last_time: Date;
    private _traces: Trace[] = [];
    private _cloud: Cloud;
    private _halo: Halo;

    private _staticRotationX = THREE.Math.degToRad(2.0);

    constructor() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(36.88, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._camera.rotation.x = this._staticRotationX;
        this._camera.position.x = 0;
        this._camera.position.y = 13;
        this._camera.position.z = 54.82;

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight)

        this.addSphere();
        this._cloud = new Cloud((meshes: THREE.Object3D[]) => {
            meshes.forEach((mesh) => {
                this._scene.add(mesh);
            })
        })
        this._halo = new Halo((mesh: THREE.Object3D) => {
            this._scene.add(mesh);
            this.addLight();
        })

        var _comet;
        var _count = getRandomInt(5, 10);
        for (var i = 0; i < _count; i++) {
            if (i === 0) {
                _comet = new Comet(true);
            } else {
                _comet = new Comet(false);
            }
            this._comets.push(_comet);
            this._scene.add(_comet.getObject());
        }

        this._last_time = new Date();

        this.addBackground();

        window.addEventListener("mousemove", (e: MouseEvent) => {
            this.handleMouseMove(e);
        })

        setTimeout(() => {
            this.render();
        }, 5);
    }

    private handleMouseMove(e: MouseEvent) {
        var centerPoint = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        var mousePoint = {
            x: e.screenX,
            y: e.screenY,
        }
        var vector = {
            x: mousePoint.x - centerPoint.x,
            y: mousePoint.y - centerPoint.y,
        };

        this._camera.rotation.x = this._staticRotationX + vector.y / window.innerHeight * 0.025;
        this._camera.rotation.y = vector.x / window.innerWidth * 0.025;
    }

    private addSphere() {
        // var geometry = new THREE.SphereBufferGeometry(300, 32, 16);
        var geometry = new THREE.BoxBufferGeometry(1000, 500, 500);
        var material = new THREE.MeshStandardMaterial({
            color: 2712982,
            roughness: 0.86,
            metalness: 0.66,
        });
        material.side = THREE.BackSide;
        material.shading = THREE.SmoothShading;

        var mesh = new THREE.Mesh(geometry, material);
        this._scene.add(mesh);
    }

    private loadImage(index: number) {
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/cloud-" + index + ".png",  (texture: THREE.Texture) => {
            var geometry = new THREE.PlaneBufferGeometry(120, 15);
            var material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.46,
                metalness: 0,
                alphaTest: 0.2,
                blending: THREE.AdditiveBlending,
            });
            material.opacity = 0.8;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = (index - 1) * -15;
            this._scene.add(mesh);
        });
    }

    private addBackground() {
        var loader = new THREE.TextureLoader();
        loader.load("/assets/images/cloud-t1.png", (texture: THREE.Texture) => {
            var geometry = new THREE.PlaneBufferGeometry(1200, 230);
            var material = new THREE.MeshStandardMaterial({
                map: texture,
                blending: THREE.AdditiveBlending,
                transparent: true
            })
            material.opacity = 0.75;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = 10;
            mesh.position.z = -185;
            this._scene.add(mesh);
        })
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
        pointLight.position.y = 80;
        pointLight.position.z = 50.22;
        pointLight.intensity =  1;
        pointLight.decay = 1;

        var sunLight = new THREE.SpotLight();
        sunLight.position.x = 0;
        sunLight.position.y = 15;
        sunLight.position.z = 180;
        sunLight.intensity = 0.42;
        sunLight.penumbra = 0.55;
        sunLight.angle = 0.220;
        sunLight.target = this._halo.getObjects();

        this._scene.add(pointLight);
        this._scene.add(sunLight);
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
            this._comets.forEach((comet) => {
                var trace = new Trace(comet.getObject().position, comet.isMain);
                this._traces.push(trace);
                this._scene.add(trace.getObject());
            });
            this._countDelta = 0;
        } else {
            var indexToRemove: number[] = [];

            this._traces.forEach((t: Trace, index: number) => {
                t.update(delta);

                if (t.getObject().position.y < -10) {
                    indexToRemove.push(index);
                }
            })

            for (let i = indexToRemove.length - 1; i >= 0; i--) {
                let toRemove = indexToRemove[i];
                this._scene.remove(this._traces[toRemove].getObject());
                this._traces.splice(toRemove, 1);
            }
            this._countDelta += delta;
        }
        
        this._cloud.update(delta);
        this._comets.forEach((comet) => {
            comet.update(delta);
        })
        this._renderer.render(this._scene, this._camera);
    }

}
